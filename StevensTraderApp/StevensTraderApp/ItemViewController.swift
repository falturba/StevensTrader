//
//  ItemViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 4/12/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit
import Alamofire
class ItemViewController: UIViewController {
    
   
    @IBOutlet weak var bidButton: UIButton!
    @IBOutlet weak var bid: UITextField!
    @IBOutlet weak var desc: UITextView!
    @IBOutlet weak var image3: UIImageView!
    @IBOutlet weak var image2: UIImageView!
    @IBOutlet weak var image1: UIImageView!
    @IBOutlet weak var name: UILabel!
    @IBOutlet weak var productTitle: UILabel!
    @IBOutlet weak var condition: UILabel!
    @IBOutlet weak var price: UILabel!
    @IBOutlet weak var email: UILabel!
    
  
    
    
    var product:Product!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if product.auction != nil
        {
            if product.auction!
            {
                bidButton.isHidden = false
                bid.isHidden = false
            }
        }
        self.productTitle.text = product.title!
        self.condition.text = product.condition?.rawValue
        self.price.text = (product.price?.stringValue)!+"$"
        self.email.text = product.ownerEmail
        self.name.text = product.ownerName
        self.desc.text = product.desc!
        if(product.medias.count > 0)
        {
            loadImages(image1,product.medias[0])
            let imageTaps1 = UITapGestureRecognizer(target: self, action: #selector(handleImageTap))
            imageTaps1.numberOfTapsRequired = 1
            image1.addGestureRecognizer(imageTaps1)
            
        }
        if(product.medias.count>1)
        {
          loadImages(image2,product.medias[1])
            let imageTaps2 = UITapGestureRecognizer(target: self, action: #selector(handleImageTap))
            imageTaps2.numberOfTapsRequired = 1
            image2.addGestureRecognizer(imageTaps2)
        }
        if(product.medias.count>2)
        {
          loadImages(image3,product.medias[2])
        let imageTaps3 = UITapGestureRecognizer(target: self, action: #selector(handleImageTap))
            imageTaps3.numberOfTapsRequired = 1
            image3.addGestureRecognizer(imageTaps3)
        }
        
        // Do any additional setup after loading the view.
        
        
        
        
       
        
        
        
        
        
    }
    
    
    func handleImageTap(_ sender: UIGestureRecognizer)
    {
        print("image pressed")
        let imageView = sender.view as! UIImageView
        
            let newImageView = UIImageView()
            newImageView.frame = self.view.frame
            newImageView.backgroundColor = .black
            newImageView.contentMode = .scaleAspectFit
            newImageView.image = imageView.image
            newImageView.isUserInteractionEnabled = true
            
            let tap = UITapGestureRecognizer(target: self, action: #selector(dismissFullscreenImage))
            newImageView.addGestureRecognizer(tap)
            self.view.addSubview(newImageView)
        
    }
    
    func dismissFullscreenImage(sender: UITapGestureRecognizer) {
        sender.view?.removeFromSuperview()
    }
    
    func loadImages(_ imageView:UIImageView,_ url:String)
    {
        
            let urlrequest = URLRequest(url: URL(string: url)!)
            URLSession.shared.dataTask(with: urlrequest, completionHandler: { (data,response,error) in
                //if downloading the thumbnail failed
                if error != nil {
                    print(error!)
                    return
                }
                
                DispatchQueue.main.async {
                    if let downloadedImage = UIImage(data: data!)
                    {
                        imageView.image = downloadedImage
                    }
                    
                }
                
                
            }).resume()
            
        
    }
  

    @IBAction func bid(_ sender: UIButton) {
        
        if checkBid()
        {
            
            
            
            
            
            let token = KeychainAccess.getToken()
            if token == nil
            {
                let alert = UIAlertController(title: "Session Expired", message: "The token has been deleted, please login again to get a new token", preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: {(action:UIAlertAction) in
                    
                    KeychainAccess.resetToken()
                    KeychainAccess.resetPassword()
                    KeychainAccess.resetUsername()
                    self.view.window!.rootViewController?.dismiss(animated: true, completion: nil)
                }))
                self.present(alert,animated: true,completion: nil)
                return
            }
            let user:User = Config.getUser()!
           
            let parameters:[String:String] =
                [
                "email":user.email! as String,
                "bid":bid.text! as String,
                "prodid":product.id! as String
            ]
            let headers: HTTPHeaders = ["authorization":"Bearer "+token!]
            
            var URL = try! URLRequest(url: Config.getServerIP()+"/services/placebid", method: .post, headers: headers)
            URL.httpBody = try! JSONSerialization.data(withJSONObject: parameters)
            URL.httpMethod = "POST"
            URL.setValue("application/json", forHTTPHeaderField: "Content-Type")
            Alamofire.request(URL).responseJSON(completionHandler: { response in
                switch response.result {
                case .success( _):
                    if response.response?.statusCode == 400
                    {
                        let alert = UIAlertController(title: "Message", message: "You can't outbid yourself", preferredStyle: .alert)
                        alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler:nil))
                        self.present(alert,animated: true,completion: nil)
                    }
                    else if response.response?.statusCode == 403
                    {
                        let alert = UIAlertController(title: "Message", message: "You can't bid on your item", preferredStyle: .alert)
                        alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler:nil))
                        self.present(alert,animated: true,completion: nil)
                    }
                    else
                    {
                        let alert = UIAlertController(title: "Message", message: "Successfully bid placed, we will send you an email if you got outbid", preferredStyle: .alert)
                        alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler:nil))
                        self.present(alert,animated: true,completion: nil)
                        self.price.text = self.bid.text
                        for prod in products
                        {
                            if prod.id == self.product.id!
                            {
                                prod.price = Int(self.price.text!)! as NSNumber
                            }
                        }
                    }
                    
                case.failure(let err):
                    print(err)
                    let alert = UIAlertController(title: "Error!", message: "Internal error, The database connections failed", preferredStyle: .alert)
                      alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler:nil))
                    self.present(alert,animated: true,completion: nil)
                    
                }
                
                
            })

            
            
            
            
            
            
            
            
        }
        else
        {
            let alert = UIAlertController(title: "Wrong bid", message: "please enter a valid number greater than the price and less than 5000", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default, handler:nil))
            self.present(alert,animated: true,completion: nil)
        }
        
    }
    func checkBid() -> Bool
    {
        let bidInt = Int(bid.text!)
        if bidInt != nil
        {
            if bidInt! > 0 && bidInt! <= 5000 && bidInt! > Int(product.price!)
            {
                return true
            }
        }
        return false
    }

}
