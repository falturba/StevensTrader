//
//  myProductsTableViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 4/13/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON
var products = [Product]()
let myCellId = "myProductCell"
class myProductsTableViewController: UITableViewController {
    
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

        loadItems()
    }
    
    func refresh(_ refreshControl: UIRefreshControl) {
        // Do your job, when done:
        loadItems()
        refreshControl.endRefreshing()
    }
    
    
    func loadItems()
    {
        let token = KeychainAccess.getPasscode()
        if token == nil
        {
            self.dismiss(animated: true, completion: nil)
        }
        else
        {
            let headers: HTTPHeaders = ["authorization":"Bearer "+token!]
            let request = try! URLRequest(url: Config.getServerIP()+"/services/getuserproductsforios", method: .get, headers: headers)
            Alamofire.request(request).responseJSON(completionHandler: { response in
                
                switch(response.result) {
                    
                case .failure(let error):
                    print(error)
                case .success( _):
                    if((response.result.value) != nil) {
                        let json = JSON(response.result.value!)
                        self.parseJson(json)
                    }
                    
                }
            })}
    }
    
    
    
    func parseJson(_ json:JSON)
    {
        
        
        
        for jsonProduct in json["products"].arrayValue {
            // print (jsonProduct["thumbnail"]["data"]["data"])
            let product = Product()
            product.title = jsonProduct["itemData"]["title"].stringValue
            product.condition = Condition(rawValue: jsonProduct["itemData"]["condition"].stringValue)
            product.price = jsonProduct["itemData"]["price"].number
            product.id = jsonProduct["itemData"]["_id"].stringValue
            product.thumbnailUrl = Config.getServerIP()+"/services/getthumbnail/"+product.id!
            
            
            
            for (_,subjson) in jsonProduct["itemData"]["medias"]
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
        print(products.count)
        
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return products.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        
        let product = products[indexPath.row]
        let cell = tableView.dequeueReusableCell(withIdentifier: myCellId, for: indexPath) as! myProductCell
        
        cell.myProductTitle.text = product.title
        cell.myProductCondition.text
            = product.condition!.rawValue
        cell.myProductPrice.text = (product.price?.stringValue)!+"$"
        
        cell.myProductImage.image = #imageLiteral(resourceName: "buy")
        cell.myProductImage.contentMode = .scaleAspectFit
        if let productImageUrl = product.thumbnailUrl {
            
            cell.myProductImage.loadImageWithCache(url: productImageUrl)
        }
        return cell
    }
    
    
    
    
}

class myProductCell : UITableViewCell {
    @IBOutlet weak var myProductTitle: UILabel!
    
    @IBOutlet weak var myProductCondition: UILabel!
    
    @IBOutlet weak var myProductPrice: UILabel!
    
    @IBOutlet weak var myProductImage: UIImageView!
    
    override func awakeFromNib()
    {
        super.awakeFromNib()
    }
    override func setSelected(_ selected: Bool, animated: Bool)
    {
        super.setSelected(selected, animated: animated)
    }
    
}

