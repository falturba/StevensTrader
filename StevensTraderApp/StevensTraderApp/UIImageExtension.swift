//
//  UIImageExtension.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 4/12/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit

let imageCahche = NSCache<AnyObject, AnyObject>()

extension UIImageView {
    func loadImageWithCache(url:String)
    {
        //fetch image from the cache
        if let cachedImage = imageCahche.object(forKey: url as AnyObject) as? UIImage
        {
            self.image = cachedImage
            return
        }
        
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
                    self.image = downloadedImage
                    imageCahche.setObject(downloadedImage, forKey: url as AnyObject)
                }
                
            }
            
            
        }).resume()
    }
}
