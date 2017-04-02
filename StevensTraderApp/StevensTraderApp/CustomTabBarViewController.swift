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

//     override func tabBar(_ tabBar: UITabBar, didSelect item: UITabBarItem)
//    {
//        if item.tag == 3
//        {
//            
//        }
//       
//    }
  
     func tabBarController(_ tabBarController: UITabBarController, shouldSelect viewController: UIViewController) -> Bool {
        print (tabBarController.selectedIndex)
        
        if tabBarController.selectedViewController == tabBarController.viewControllers?[2] && tabBarController.selectedIndex != 2
        {
            return false
        }else{
            return true
        }
    }

}
