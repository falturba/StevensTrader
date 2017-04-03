//
//  CustomTabBarViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 4/2/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit

class CustomTabBarViewController: UITabBarController,UITabBarControllerDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()
        self.delegate = self
        // Do any additional setup after loading the view.
    }


     func tabBarController(_ tabBarController: UITabBarController, shouldSelect viewController: UIViewController) -> Bool {
 
        if viewController == tabBarController.customizableViewControllers?[2]
        {
          let actionSheet = UIAlertController(title: "Options", message: "select an option", preferredStyle: .actionSheet)
            actionSheet.addAction(UIAlertAction(title: "Cancel", style: .default, handler:nil))
            
            
            actionSheet.addAction(UIAlertAction(title: "Logout", style: .default, handler: {(action:UIAlertAction) in
                
                    KeychainAccess.resetPasscode()
                    self.dismiss(animated: true, completion: nil)
                    
                        
                }))
            
            
            self.present(actionSheet,animated:true,completion: nil)
            
            
          return false
        }
        
        else
        {
          return true
        }
    }

}
