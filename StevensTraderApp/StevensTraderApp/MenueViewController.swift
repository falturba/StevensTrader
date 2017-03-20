//
//  MenueViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 3/18/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit

class MenueViewController: UIViewController {
    
   
    @IBAction func signout(_ sender: Any) {
        let myKeychain = KeychainAccess()
        myKeychain.resetPasscode(identifier: "StevensTraderToken")
        self.dismiss(animated: true, completion: nil)
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
        
    }

    
}
