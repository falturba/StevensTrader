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
    var product:Product!
    override func viewDidLoad() {
        super.viewDidLoad()
        self.tableView.contentInset = UIEdgeInsets(top: 20, left: 0, bottom: 0, right: 0)
        let refreshControl = UIRefreshControl()
        refreshControl.addTarget(self, action: #selector(refresh(_:)), for: .valueChanged)
        
        if #available(iOS 10.0, *) {
            tableView.refreshControl = refreshControl
        } else {
            tableView.backgroundView = refreshControl
        }
    
    

        
        
    }

    func reloadData()
    {
        let serverip =  Config.getServerIP()
        Alamofire.request(serverip+"/services/getproductsforios").responseJSON { (responseData) -> Void in
            if((responseData.result.value) != nil) {
                let json = JSON(responseData.result.value!)
                self.parseJson(json)
            }
        }
    }

func refresh(_ refreshControl: UIRefreshControl) {
    // Do your job, when done:
    reloadData()
    refreshControl.endRefreshing()
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
                product.ownerName = jsonProduct["userData"]["name"].stringValue
                product.ownerEmail = jsonProduct["userData"]["email"].stringValue
                
                
                for (_,subjson) in jsonProduct["medias"]
                {
                    let url:String = Config.getServerIP()+"/services/getimage/"+subjson["_id"].string!
                    
                    product.medias.append(url)
                }
                
                var exist = false
                for prod in products
                {
                    if(prod.id==product.id)
                    {
                        exist = true
                    }
                    
                }
                if(exist) { continue }
                products.append(product)
                
                
            }
        DispatchQueue.main.async {
            self.tableView.reloadData()
        }
        
        
    }
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return products.count
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath)
    {
        self.product = products[indexPath.item]
        performSegue(withIdentifier: "showItemSegue", sender: self)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if(segue.identifier! == "showItemSegue")
        {
            if let itemView = segue.destination as? ItemViewController {
            
                itemView.product = product
            }
        }
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
            
            cell.productImage.loadImageWithCache(url: productImageUrl)
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










