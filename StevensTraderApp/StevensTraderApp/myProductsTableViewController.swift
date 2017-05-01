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
class myProductsTableViewController: UITableViewController,UINavigationBarDelegate {
    
    var product:Product!
    let myCellId = "myProductCell"
    
    override func viewWillAppear(_ animated: Bool) {
        loadItems()
    }
    override func viewDidLoad()
    {
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
        
        loadItems()
        refreshControl.endRefreshing()
    }
    
    
    func loadItems()
    {
        products = []
        let token = KeychainAccess.getToken()
        if token == nil
        {
            let alert = UIAlertController(title: "Session Expired", message: "The token has been deleted, please login again to get a new token", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default, handler: {(action:UIAlertAction) in self.dismiss(animated: true, completion: nil)}))
            self.present(alert,animated: true,completion: nil)
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
            product.desc = jsonProduct["itemData"]["description"].stringValue
            product.auction = jsonProduct["itemData"]["auction"].bool
            if(product.title == "" || product.condition == nil || product.price == nil || product.id == "")
            {
                continue
            }
            
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
        
        
    }
    
    
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath)
    {
        self.product = products[indexPath.item]
        performSegue(withIdentifier: "showMyItemSegue", sender: self)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if(segue.identifier! == "showMyItemSegue")
        {
            
            if let nav = segue.destination as? UINavigationController {
                if  let myitemview = nav.topViewController as? MyItemViewController
                {
                    myitemview.product = product
                }
            }
        }
    }
    
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return products.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        
        let product = products[indexPath.row]
        let cell = tableView.dequeueReusableCell(withIdentifier: myCellId, for: indexPath) as! myProductCell
        
        
        
        if product.auction != nil
        {
            if product.auction!
            {
                cell.productType.image = #imageLiteral(resourceName: "auction")
            }
            else
            {
                cell.productType.image = #imageLiteral(resourceName: "priceTag")
            }
        }
        
        
        if(product.title != nil )
        {
            cell.myProductTitle.text = product.title
        }
        
        if(product.condition != nil)
        {
            cell.myProductCondition.text = product.condition?.rawValue
        }
        
        if(product.price != nil)
        {
            cell.myProductPrice.text = (product.price?.stringValue)!+"$"
        }
        
        
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
    @IBOutlet weak var productType: UIImageView!
    
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

