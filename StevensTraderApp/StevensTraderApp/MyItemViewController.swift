//
//  MyItemViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 5/1/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit
import Alamofire
class MyItemViewController: UIViewController, UINavigationBarDelegate {

    
    @IBOutlet weak var viewBidders: UIButton!
    @IBOutlet weak var productTitle: UILabel!
    @IBOutlet weak var image1: UIImageView!
    @IBOutlet weak var image2: UIImageView!
    @IBOutlet weak var image3: UIImageView!
    @IBOutlet weak var condition: UILabel!
    @IBOutlet weak var desc: UITextView!
    @IBOutlet weak var price: UILabel!
    var product:Product!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        
        
        let backButton = UIBarButtonItem(title: "<back", style: .done, target: self, action: #selector(back(_ :)))
        
        self.navigationItem.leftBarButtonItem = backButton
        
        
        if product.auction != nil
        {
            if product.auction!
            {
                viewBidders.isHidden = false
                
            }
        }
        self.productTitle.text = product.title!
        self.condition.text = product.condition?.rawValue
        self.price.text = (product.price?.stringValue)!+"$"
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

    @IBAction func viewBidders(_ sender: UIButton) {
        
        performSegue(withIdentifier: "showBidderSegue", sender: self)

        
        
        
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if(segue.identifier! == "showBidderSegue")
        {
            if let itemView = segue.destination as? BiddersTableViewController {
                
                itemView.product = product
            }
        }
    }

    
    
    @IBAction func deleteItem(_ sender: UIButton) {
        
        
        
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
        
        
        let parameters:[String:String] =
            ["prodid":product!.id!]
       
        
        
        
        
        let headers: HTTPHeaders = ["authorization":"Bearer "+token!]
        
        var URL = try! URLRequest(url: Config.getServerIP()+"/services/deleteitem", method: .post, headers: headers)
        
        URL.httpBody = try! JSONSerialization.data(withJSONObject: parameters)
        URL.httpMethod = "POST"
        URL.setValue("application/json", forHTTPHeaderField: "Content-Type")
        Alamofire.request(URL).responseJSON(completionHandler: { response in
            switch response.result {
            case .success( _):
                if response.response?.statusCode == 200
                {
                    
                    let alert = UIAlertController(title: "Confirmation", message: "Item successfully deleted", preferredStyle: .alert)
                    alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler:{(action:UIAlertAction) in
                        self.dismiss(animated: true, completion: nil)
                    }))

                    self.present(alert,animated: true,completion: nil)
                    

                }
                else
                {
                    let alert = UIAlertController(title: "Error", message: "Connection to the database failed", preferredStyle: .alert)
                    alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler:nil))
                    self.view.window!.rootViewController?.dismiss(animated: true, completion: nil)
                }
                
            case.failure(let err):
                print(err)
                let alert = UIAlertController(title: "Error", message: "Connection to the server failed", preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler:nil))
                self.view.window!.rootViewController?.dismiss(animated: true, completion: nil)
                
            }
        
        
        
        
        })
    }
    
    
    
    func back(_ sender:UIBarButtonItem)
    {
        self.dismiss(animated: true, completion: nil)
    }



}
