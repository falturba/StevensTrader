//
//  ChangePasswordViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 4/30/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit
import Alamofire
class ChangePasswordViewController: UIViewController {
    
    @IBOutlet weak var currentPassword: UITextField!
    @IBOutlet weak var newPassword: UITextField!
    @IBOutlet weak var renewPassword: UITextField!
    let regex:NSRegularExpression = try! NSRegularExpression(pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
    }
    
    @IBAction func changePassword(_ sender: Any)
    {
        if(newPassword.text! != renewPassword.text!)
        {
            let alert = UIAlertController(title: "Password Mismatch", message: "new password deosn't match re-new password", preferredStyle: UIAlertControllerStyle.alert)
            alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
            self.present(alert, animated: true, completion: nil)
            return
        }
        if checkPassword(pass: newPassword.text!) && checkPassword(pass: renewPassword.text!)
        {
            let parameters:[String:String] =
                ["currpass":currentPassword.text!,
                 "newpass":newPassword.text!
            ]
            
            
            let token = KeychainAccess.getToken()
            if token == nil
            {
                let alert = UIAlertController(title: "Session Expired", message: "The token has been deleted, please login again to get a new token", preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "OK", style: .default, handler: {(action:UIAlertAction) in self.dismiss(animated: true, completion: nil)}))
                self.present(alert,animated: true,completion: nil)
                
            }

            
            
            let headers: HTTPHeaders = ["authorization":"Bearer "+token!]
            var URL = try! URLRequest(url: Config.getServerIP()+"/services/changepassword", method: .post, headers: headers)
            
            
           
            
            URL.httpMethod = "POST"
            URL.httpBody = try! JSONSerialization.data(withJSONObject: parameters)
            URL.setValue("application/json", forHTTPHeaderField: "Content-Type")
            Alamofire.request(URL).responseJSON(completionHandler: { response in switch response.result {
            case .failure(let err):
                print (err)
            case .success( _):
                let alert:UIAlertController?
                if response.response?.statusCode == 200
                {
                    
                    
                    alert = UIAlertController(title:"Message", message: "password updated sucessfully", preferredStyle: UIAlertControllerStyle.alert)
                    alert?.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: {(action:UIAlertAction) in
                        
                        KeychainAccess.resetToken()
                        KeychainAccess.resetPassword()
                        KeychainAccess.resetUsername()
                        self.view.window!.rootViewController?.dismiss(animated: true, completion: nil)
                    }))
                    
                }
                else if response.response?.statusCode == 401
                {
                    alert = UIAlertController(title:"Message", message: "It seems you have logged in from another device. session has expired, please login again", preferredStyle: UIAlertControllerStyle.alert)
                    alert?.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: {(action:UIAlertAction) in
                        
                        KeychainAccess.resetToken()
                        KeychainAccess.resetPassword()
                        KeychainAccess.resetUsername()
                        self.view.window!.rootViewController?.dismiss(animated: true, completion: nil)
                    }))
                }
                
                else if response.response?.statusCode == 400
                {
                    alert = UIAlertController(title:"Message", message: "current password is incorrect", preferredStyle: UIAlertControllerStyle.alert)
                    alert?.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler:nil ))
                }
                    
                else
                {
                    alert = UIAlertController(title:"Message", message: "error in the server", preferredStyle: UIAlertControllerStyle.alert)
                    alert?.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler:nil))
                }
                
                
                    self.present(alert!, animated: true, completion: nil)
                
                
                
            
                }})
            
            
            
        }
        else {
            let alert = UIAlertController(title:"new password error", message: "Password has to be minimum 8 characters, at least 1 Alphabet and 1 Number", preferredStyle: UIAlertControllerStyle.alert)
            alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
            self.present(alert, animated: true, completion: nil)
        }
        
        
    }
    
    func checkPassword(pass:String) -> Bool
    {

        let matches = regex.matches(in: pass, options:[], range:NSRange(location:0,length:pass.utf16.count))
        if matches.count > 0
        {
            return true
        }
        else
        {
            return false
        }
    }
    
    
}
