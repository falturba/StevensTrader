//
//  BuyTableViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 4/3/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON
class BuyTableViewController: UITableViewController {
    let cellId = "productCell"
    var products = [Product]()
    override func viewDidLoad() {
        super.viewDidLoad()
        
     //   tableView.register(ProductCell.self, forCellReuseIdentifier: cellId)
        
        let serverip =  Config.getServerIP()
        Alamofire.request(serverip+"/services/getproductsforios").responseJSON { (responseData) -> Void in
            if((responseData.result.value) != nil) {
                let json = JSON(responseData.result.value!)
                self.parseJson(json)
            }
        }
    }
    func parseJson(_ json:JSON)
    {
        
        
        
            for jsonProduct in json["products"].arrayValue {
               // print (jsonProduct["thumbnail"]["data"]["data"])
                let product = Product()
                product.title = jsonProduct["title"].stringValue
                product.condition = Condition(rawValue: jsonProduct["condition"].stringValue)
                product.price = jsonProduct["price"].number
                product.id = jsonProduct["_id"].stringValue
                product.thumbnailUrl = Config.getServerIP()+"/services/getthumbnail/"+product.id!

                products.append(product)
                
                
            }
        DispatchQueue.main.async {
            self.tableView.reloadData()
        }
        
        
    }
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return products.count
    }
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        
       let product = products[indexPath.row]
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId, for: indexPath) as! ProductCell
        cell.productTitle.text = product.title
        cell.productCondition.text
            = product.condition!.rawValue
        cell.productPrice.text = (product.price?.stringValue)!+"$"
        
       cell.productImage.image = #imageLiteral(resourceName: "buy")
        cell.productImage.contentMode = .scaleAspectFit
        if let productImageUrl = product.thumbnailUrl {
            let urlrequest = URLRequest(url: URL(string: productImageUrl)!)
            URLSession.shared.dataTask(with: urlrequest, completionHandler: { (data,response,error) in
                
                //if downloading the thumbnail failed
                if error != nil {
                    print(error!)
                    return
                }
                
                DispatchQueue.main.async {
                    let image = UIImage(data: data!)
                    cell.productImage.image = image
                }
                
                
            }).resume()
        }
        return cell
    }

}


class ProductCell : UITableViewCell {
    @IBOutlet weak var productImage: UIImageView!
    
    @IBOutlet weak var productTitle: UILabel!
    @IBOutlet weak var productCondition: UILabel!
    @IBOutlet weak var productPrice: UILabel!
    
    
   
    override func awakeFromNib()
    {
        super.awakeFromNib()
    }
    override func setSelected(_ selected: Bool, animated: Bool)
    {
        super.setSelected(selected, animated: animated)
    }
    
}










