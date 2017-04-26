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
class BuyTableViewController: UITableViewController, UINavigationBarDelegate {
    let cellId = "productCell"
    var products = [Product]()
    var product:Product!
    var maxPrice:Int?
    var minPrice:Int?
    var searchCategory:String?
    
   
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.tableView.contentInset = UIEdgeInsets(top: 20, left: 0, bottom: 0, right: 0)
        let refreshControl = UIRefreshControl()
        refreshControl.addTarget(self, action: #selector(refresh(_:)), for: .valueChanged)
        
        let backButton = UIBarButtonItem(title: "Search", style: .done, target: self, action: #selector(back(_ :)))
    
        self.navigationItem.leftBarButtonItem = backButton
        if #available(iOS 10.0, *) {
            tableView.refreshControl = refreshControl
        } else {
            tableView.backgroundView = refreshControl
        }
    
    reloadData()
//        let searchBar:UISearchBar = UISearchBar.init(frame: CGRect(x: 0, y: 0, width: 320, height: 44))
//        self.tableView.tableHeaderView = searchBar
        
        
    }

    func reloadData()
    {
        
        var service:String = Config.getServerIP()
        if searchCategory == "Any"
        {
            service.append( "/services/getproductsforios/")
            service.append(String(describing: minPrice!))
            service.append("/")
            service.append(String(describing: maxPrice!))
        }
        else
        {
            service.append( "/services/getproductsforioswithcategory/")
            service.append(String(describing: minPrice!))
            service.append("/")
            service.append(String(describing: maxPrice!))
            service.append("/")
            service.append(searchCategory!)
        }

        
        Alamofire.request(service).responseJSON { (responseData) -> Void in
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
               
                let product = Product()
                
                product.title = jsonProduct["title"].stringValue
                product.condition = Condition(rawValue: jsonProduct["condition"].stringValue)
                product.price = jsonProduct["price"].number
                product.id = jsonProduct["_id"].stringValue
                product.thumbnailUrl = Config.getServerIP()+"/services/getthumbnail/"+product.id!
                product.ownerName = jsonProduct["userData"]["name"].stringValue
                product.ownerEmail = jsonProduct["userData"]["email"].stringValue
                product.createdAt = jsonProduct["createdAt"].stringValue
                product.updatedAt = jsonProduct["updatedAt"].stringValue
                
                if(product.title == "" || product.condition == nil || product.price == nil || product.id == "" || product.ownerName == "" || product.ownerEmail == "")
                {
                    continue
                }
                
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
        cell.lastUpdated?.text = product.updatedAt
        
        if let productImageUrl = product.thumbnailUrl {
            
            cell.productImage.loadImageWithCache(url: productImageUrl)
        }
        return cell
    }
    
    
    func back(_ sender:UIBarButtonItem)
   {
     self.dismiss(animated: true, completion: nil)
    }
    

}


class ProductCell : UITableViewCell
{
    @IBOutlet weak var productImage: UIImageView!
    @IBOutlet weak var lastUpdated:UILabel?
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










