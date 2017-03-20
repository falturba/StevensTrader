//
//  ViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 2/10/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit
import Alamofire
class LoginViewController: UIViewController {
    
    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var password: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
           
        
        
    }
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(false)
        loadLoggedInUser()
    }
    func loadLoggedInUser() {
        let myKeychain = KeychainAccess()
        let key = myKeychain.getPasscode(identifier: "StevensTraderToken")
        if(key != nil) {
            self.performSegue(withIdentifier: "menueSegue", sender: self)
        }
    }
    
    @IBAction func login(_ sender: UIButton) {
        
        let emailText = email.text!+"@stevens.edu"
        let passwrodText = password.text!
        do {
            let serverip = try Config.getServerIP()
            let url = URL(string:serverip+"/services/login")
            var request =  URLRequest( url:url!)
            request.httpMethod = "POST"
            let parameters:[String:String]=["email":emailText,"password":passwrodText]
            request.httpBody = try! JSONSerialization.data(withJSONObject: parameters)
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            Alamofire.request(request).responseJSON(completionHandler: {
                response in switch response.result {
                case .failure(let error):
                    print(error)
                    let alert = UIAlertController(title: "Error", message: "Error in connecting to ther server. Please try again later", preferredStyle: UIAlertControllerStyle.alert)
                    alert.addAction(UIAlertAction(title: "Click", style: UIAlertActionStyle.default, handler: nil))
                    self.present(alert, animated: true, completion: nil)
                    if let data = response.data, let responseString = String(data: data, encoding: .utf8) {
                        print(responseString)
                    }
                case .success(_):
                    guard let json = response.value as? [String:String],let jwt = json["token"] else {
                        let alert = UIAlertController(title: "Error", message: "Error in Error in the server response", preferredStyle: UIAlertControllerStyle.alert)
                        alert.addAction(UIAlertAction(title: "Click", style: UIAlertActionStyle.default, handler: nil))
                        self.present(alert, animated: true, completion: nil)
                        print (response.value ?? "no response")
                       return
                    }
                    let myKeychainAccess = KeychainAccess()
                    myKeychainAccess.setPasscode(identifier: "StevensTraderToken",passcode: jwt)
                    self.performSegue(withIdentifier: "menueSegue", sender: nil)
                }
            })
        } catch {
            print("Missing serverIP in Info.plist")
        }
        
        
        
        
        
        
    }
    
    
    
}

