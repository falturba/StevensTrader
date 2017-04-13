//
//  ViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 2/10/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit
import Alamofire
import LocalAuthentication
class LoginViewController: UIViewController {
    
    @IBOutlet weak var segmantControl: UISegmentedControl!
    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var name: UITextField!
    @IBOutlet weak var password: UITextField!
    @IBOutlet weak var button: UIButton!
    @IBOutlet weak var touchlogin: UIButton!
    var activityIndicator = UIActivityIndicatorView()
   
    typealias JSONStandard = Dictionary<String, AnyObject>
    //local Auth
    var context = LAContext()
    override func viewDidLoad() {
        super.viewDidLoad()
        
        activityIndicator.center = self.view.center
        activityIndicator.hidesWhenStopped = true
        activityIndicator.hidesWhenStopped = true
        view.addSubview(activityIndicator)
        
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action:#selector(UIInputViewController.dismissKeyboard))
        tap.cancelsTouchesInView = true
        view.addGestureRecognizer(tap)
        name.isHidden = true
        if context.canEvaluatePolicy(LAPolicy.deviceOwnerAuthenticationWithBiometrics, error: nil) {
            touchlogin.isHidden = false
        }
        NotificationCenter.default.addObserver(self, selector: #selector(LoginViewController.keyboardWillShow), name: NSNotification.Name.UIKeyboardWillShow, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(LoginViewController.keyboardWillHide), name: NSNotification.Name.UIKeyboardWillHide, object: nil)
        
    }
    override func viewWillDisappear(_ animated: Bool) {
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name.UIKeyboardWillShow, object: self.view.window)
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name.UIKeyboardWillHide, object: self.view.window)
    }
    /*--------------------- Keyboard handlers functions -----------------------*/
    func dismissKeyboard()
    {
        view.endEditing(true)
    }
    
    func keyboardWillShow(notification: NSNotification) {
        
        if let keyboardSize = (notification.userInfo?[UIKeyboardFrameBeginUserInfoKey] as? NSValue)?.cgRectValue {
            if self.view.frame.origin.y == 0{
                self.view.frame.origin.y -= keyboardSize.height
            }
        }
        
    }
    
    func keyboardWillHide(notification: NSNotification) {
        if let keyboardSize = (notification.userInfo?[UIKeyboardFrameBeginUserInfoKey] as? NSValue)?.cgRectValue {
            if self.view.frame.origin.y != 0{
                self.view.frame.origin.y += keyboardSize.height
            }
        }
    }
    /*----------------------------------------------------------------------------*/
    
    @IBAction func changeSegmant(_ sender: Any) {
        if segmantControl.selectedSegmentIndex == 0
        {
            button.setTitle("login", for: [])
            name.isHidden = true
            touchlogin.isEnabled = true
            
        }else {
            button.setTitle("Signup", for: [])
            name.isHidden = false
            touchlogin.isEnabled = false
        }
        
    }
    override func viewDidAppear(_ animated: Bool) {
        loadLoggedInUser()
        super.viewDidAppear(false)
        
    }
    func loadLoggedInUser() {
        
        let key = KeychainAccess.getPasscode()
        if(key != nil) {
            self.performSegue(withIdentifier: "menueSegue", sender: self)
        }
    }
    
    
    
    @IBAction func loginSignupButton(_ sender: Any) {
        if segmantControl.selectedSegmentIndex == 0
        {
            UIApplication.shared.beginIgnoringInteractionEvents()
            activityIndicator.startAnimating()
            login()
            activityIndicator.stopAnimating()
            UIApplication.shared.endIgnoringInteractionEvents()
        }
        else
        {
            UIApplication.shared.beginIgnoringInteractionEvents()
            activityIndicator.startAnimating()
            signup()
            activityIndicator.stopAnimating()
            UIApplication.shared.endIgnoringInteractionEvents()
        }
        
        
    }
    
    
    func login() {
        
        let emailText = email.text!+"@stevens.edu"
        let passwrodText = password.text!
        let serverip =  Config.getServerIP()
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
                let alert = UIAlertController(title: "Error..", message: "Error in connecting to ther server. Please try again later", preferredStyle: UIAlertControllerStyle.alert)
                alert.addAction(UIAlertAction(title: "Click", style: UIAlertActionStyle.default, handler: nil))
                self.present(alert, animated: true, completion: nil)
                if let data = response.data, let responseString = String(data: data, encoding: .utf8)
                {
                    print(responseString)
                }
            case .success(_):
                guard let json = response.value as? [String:String],let jwt = json["token"] else
                {
                    var errorMessage = "Something wrong with the server. Please try again later"
                     if response.response?.statusCode == 401
                    {
                        errorMessage = "Wrong username or password"
                        
                     }else if response.response?.statusCode == 500
                     {
                        print("error in the database connection")
                    }
                let alert = UIAlertController(title: "Error", message: errorMessage, preferredStyle: UIAlertControllerStyle.alert)
                alert.addAction(UIAlertAction(title: "Click", style: UIAlertActionStyle.default, handler: nil))
                self.present(alert, animated: true, completion: nil)
                return
                }
                
                
                KeychainAccess.setPasscode(passcode: jwt)
                print(jwt)
                self.performSegue(withIdentifier: "menueSegue", sender: nil)
            }
        })
    }
    
        
        
        
        
        
        
        
        
        func signup() {
            if(checkTextField(type:"email"))
            {
                if(checkTextField(type:"name"))
                {
                    if(checkTextField(type:"password")){
                        let emailText = email.text!+"@stevens.edu"
                        let nameText = name.text!
                        let passwordText = password.text!
                        let serverip =  Config.getServerIP()
                        let url = URL(string:serverip+"/services/signup")
                        var request = URLRequest( url:url!)
                        request.httpMethod = "POST"
                        let parameters: [String: String] = [
                            "type" : "register" as String,
                            "name" : nameText as String,
                            "email" : emailText as String,
                            "password":passwordText as String
                        ]
                        request.httpBody = try! JSONSerialization.data(withJSONObject: parameters)
                        
                        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
                        
                        Alamofire.request(request).responseJSON(completionHandler:{ response in
                            switch response.result {
                            case .failure(let error):
                                print(error)
                                let alert = UIAlertController(title: "Error", message: "Error in connecting to ther server. Please try again later", preferredStyle: UIAlertControllerStyle.alert)
                                alert.addAction(UIAlertAction(title: "Click", style: UIAlertActionStyle.default, handler: nil))
                                self.present(alert, animated: true, completion: nil)
                                if let data = response.data, let responseString = String(data: data, encoding: .utf8) {
                                    print(responseString)
                                }
                            case .success(_):
                                let result = response.result
                                var msg = ""
                                if let dict = result.value as? JSONStandard{
                                    msg = dict["msg"] as! String
                                }
                                
                                let alert = UIAlertController(title: "message", message:msg, preferredStyle: UIAlertControllerStyle.alert)
                                alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
                                self.present(alert, animated: true, completion: nil)
                            }
                            
                        })
                    }
                    else {
                        let alert = UIAlertController(title: "Wrong Password", message: "Password has to be minimum 8 characters, at least 1 Alphabet and 1 Number", preferredStyle: UIAlertControllerStyle.alert)
                        alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
                        self.present(alert, animated: true, completion: nil)
                    }
                    
                }
                else {
                    let alert = UIAlertController(title: "Wrong Name", message: "Name has to be letters only", preferredStyle: UIAlertControllerStyle.alert)
                    alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
                    self.present(alert, animated: true, completion: nil)
                }
                
            }
            else {
                let alert = UIAlertController(title: "Wrong Email", message: "Email has to be letters only", preferredStyle: UIAlertControllerStyle.alert)
                alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
                self.present(alert, animated: true, completion: nil)
            }
        }
        
        
        func checkTextField(type:String) -> Bool
        {
            let regex:NSRegularExpression!
            let input:String!
            do
            {
                switch(type){
                case "email":
                    regex = try NSRegularExpression(pattern: "^[a-zA-Z]+[a-zA-Z]*$")
                    input = email.text!
                    break
                case "name":
                    regex = try NSRegularExpression(pattern: "^[a-zA-Z]+[a-zA-Z]*$")
                    input = name.text!
                    break
                case "password":
                    regex = try NSRegularExpression(pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")
                    input = password.text!
                    break
                default:
                    print ("error type")
                    return false
                }
                let matches = regex.matches(in: input, options:[], range:NSRange(location:0,length:input.utf16.count))
                if (matches.count>0){
                    return true
                }
                else{
                    return false
                }
            }catch{
                print("wrong regular expression")
                return false
            }
        }
        
        @IBAction func touchLogin(_ sender: Any) {
            // 1.
            if context.canEvaluatePolicy(LAPolicy.deviceOwnerAuthenticationWithBiometrics, error:nil) {
                
                // 2.
                context.evaluatePolicy(LAPolicy.deviceOwnerAuthenticationWithBiometrics,
                                       localizedReason: "Logging in with Touch ID") {
                                        (success, evaluateError) in
                                        
                                        if (success) {
                                            DispatchQueue.main.async {
                                                // User authenticated successfully, take appropriate action
                                                
                                                self.performSegue(withIdentifier: "menueSegue", sender: self)
                                            }
                                        } else {
                                            
                                            if let error: LAError = evaluateError as! LAError? {
                                                var message: String
                                                var showAlert : Bool
                                                
                                                switch error {
                                                    
                                                case LAError.authenticationFailed:
                                                    message = "There was a problem verifying your identity."
                                                    showAlert = true
                                                case LAError.userCancel:
                                                    message = "You pressed cancel."
                                                    showAlert = true
                                                case LAError.userFallback:
                                                    message = "You pressed password."
                                                    showAlert = true
                                                default:
                                                    showAlert = true
                                                    message = "Touch ID may not be configured"
                                                }
                                                
                                                if showAlert {
                                                    let alertView = UIAlertController(title: "Error",
                                                                                      message: message as String, preferredStyle:.alert)
                                                    let okAction = UIAlertAction(title: "Darn!", style: .default, handler: nil)
                                                    alertView.addAction(okAction)
                                                    self.present(alertView, animated: true, completion: nil)
                                                }
                                            }
                                        }
                                        
                }
            } else {
                // 5.
                let alertView = UIAlertController(title: "Error",
                                                  message: "Touch ID not available" as String, preferredStyle:.alert)
                let okAction = UIAlertAction(title: "Darn!", style: .default, handler: nil)
                alertView.addAction(okAction)
                self.present(alertView, animated: true, completion: nil)
            }
}

}


