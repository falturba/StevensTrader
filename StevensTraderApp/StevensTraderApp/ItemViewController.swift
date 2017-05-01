//
//  ItemViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 4/12/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit

class ItemViewController: UIViewController {
    
   
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
  



}
