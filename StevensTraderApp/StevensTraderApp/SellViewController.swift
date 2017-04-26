//
//  sellViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 2/22/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit
import Alamofire
import MobileCoreServices
import AVFoundation
class SellViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate, UIPickerViewDelegate,UIPickerViewDataSource, UITextFieldDelegate, UITextViewDelegate
{
    
    @IBOutlet weak var price: UITextField!
    @IBOutlet weak var itemTitle: UITextField!
    
    @IBOutlet weak var deleteButton1: UIButton!
    @IBOutlet weak var deleteButton2: UIButton!
    @IBOutlet weak var deleteButton3: UIButton!
    
    var imagePicked = 0
    let coniditionList = ["New","Refurbished","Used","Very Good","Good","Acceptable"]
    let categoryList =   ["Electronics","Books","Bikes","Video Games","Bags","Misc"]
    @IBOutlet  var imageView1: CustomUIImageView!
    @IBOutlet  var imageView2: CustomUIImageView!
    @IBOutlet  var imageView3: CustomUIImageView!
    @IBOutlet var condition: UITextField!
    @IBOutlet var conditionDropDown: UIPickerView!
    @IBOutlet  var category: UITextField!
    
    @IBOutlet  var categoryDropDown: UIPickerView!
    
    @IBOutlet weak var productDesc: UITextView!
    var activityIndicator = UIActivityIndicatorView()
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        deleteButton1.isEnabled = false
        deleteButton2.isEnabled = false
        deleteButton3.isEnabled = false
        activityIndicator.center = self.view.center
        activityIndicator.activityIndicatorViewStyle = UIActivityIndicatorViewStyle.gray
        activityIndicator.hidesWhenStopped = true
        view.addSubview(activityIndicator)
        
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action:#selector(UIInputViewController.dismissKeyboard))
        tap.cancelsTouchesInView = false
        view.addGestureRecognizer(tap)
        
        self.condition.allowsEditingTextAttributes = false
        self.category.allowsEditingTextAttributes = false
        
        let imageTaps1 = UITapGestureRecognizer(target: self, action: #selector(handleImageTap))
        let imageTaps2 = UITapGestureRecognizer(target: self, action: #selector(handleImageTap))
        let imageTaps3 = UITapGestureRecognizer(target: self, action: #selector(handleImageTap))
        imageTaps1.numberOfTapsRequired = 1
        imageTaps2.numberOfTapsRequired = 1
        imageTaps3.numberOfTapsRequired = 1
        imageView1.addGestureRecognizer(imageTaps1)
        imageView2.addGestureRecognizer(imageTaps2)
        imageView3.addGestureRecognizer(imageTaps3)
        
        self.condition.delegate = self
        self.category.delegate = self
        self.productDesc.delegate = self
        self.itemTitle.delegate = self
        self.price.delegate = self
        
        
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
        categoryDropDown.isHidden = true
        conditionDropDown.isHidden = true
    }
    
    func keyboardWillShow(notification: NSNotification) {
        if itemTitle.isEditing == true
        {
            return
        }
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
    /*------------------------ Picker View Functions ------------------------------*/
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        if(pickerView == conditionDropDown)
        {
            return coniditionList.count
        }
        if(pickerView == categoryDropDown)
        {
            return categoryList.count
        }
        return 0
    }
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        
        
        if(pickerView == conditionDropDown)
        {
            return coniditionList[row]
        }
        if(pickerView == categoryDropDown)
        {
            return categoryList[row]
        }
        return ""
    }
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        
        
        if(pickerView == conditionDropDown)
        {
            condition.text = coniditionList[row]
            self.conditionDropDown.isHidden = true
        }
        if(pickerView == categoryDropDown)
        {
            category.text = categoryList[row]
            self.categoryDropDown.isHidden = true
        }
        
    }
    func textFieldDidBeginEditing(_ textField: UITextField) {
        
        
        if(textField == condition)
        {
            self.conditionDropDown.isHidden = false
            self.view.bringSubview(toFront: self.conditionDropDown)
            condition.endEditing(true)
        }
        if(textField == category)
        {
            self.categoryDropDown.isHidden = false
            self.view.bringSubview(toFront: self.categoryDropDown)
            category.endEditing(true)
        }
        
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        self.view.endEditing(true)
        return false
    }
    
    
    //replace the selecting image with the default && hide the delete button
    @IBAction func deleteImage(_ sender:UIButton)
    {
        
        let alert = UIAlertController(title: "delete image", message: "Are you sure want to delete the image?", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "Yes", style:.default, handler: {(alert:UIAlertAction!) in self.deleteAction(sender.tag)}))
        alert.addAction(UIAlertAction(title: "Cancel", style:.default, handler:nil))
        self.present(alert,animated: true , completion: nil)
        
        
    }
    
    func deleteAction(_ tag:Int)
    {
        
        switch(tag)
        {
        case 1:
            imageView1.image = #imageLiteral(resourceName: "camera")
            imageView1.backgroundColor = UIColor(red: 159/255, green: 17/255, blue: 51/255, alpha: 1.0)
            deleteButton1.isHidden = true
            deleteButton1.isEnabled = false
            
            imageView1.set = false
            
            
            break
        case 2:
            imageView2.image = #imageLiteral(resourceName: "camera")
            imageView2.backgroundColor = UIColor(red: 159/255, green: 17/255, blue: 51/255, alpha: 1.0)
            deleteButton2.isHidden = true
            deleteButton2.isEnabled = false
            
            imageView2.set = false
            break
        case 3:
            imageView3.image = #imageLiteral(resourceName: "camera")
            imageView3.backgroundColor = UIColor(red: 159/255, green: 17/255, blue: 51/255, alpha: 1.0)
            deleteButton3.isHidden = true
            deleteButton3.isEnabled = false
            
            imageView3.set = false
            break
        default:
            print ("fatal error!")
            break
        }
    }
    //This event fired when the user tap on the image view
    func handleImageTap(_ sender: UIGestureRecognizer)
    {
        DispatchQueue.main.async {
            AudioServicesPlaySystemSound(1104)
        }
        let imageView = sender.view as! CustomUIImageView
        if(imageView.set)
        {
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
        else
        {
            imagePicked = imageView.tag
            let imagePicker = UIImagePickerController()
            imagePicker.delegate = self
            let actionSheet = UIAlertController(title: "Photo Source", message: "choose a source", preferredStyle: .actionSheet)
            
            actionSheet.addAction(UIAlertAction(title: "Camera", style: .default, handler: {(action:UIAlertAction) in
                
                if UIImagePickerController.isSourceTypeAvailable(.camera)
                {
                    imagePicker.sourceType =  .camera
                    imagePicker.mediaTypes = [kUTTypeImage as String]
                    imagePicker.allowsEditing = false
                    self.present(imagePicker, animated: false, completion: nil)
                }
                else
                {
                    print ("camera is not available on this device")
                }
            }))
            
            actionSheet.addAction(UIAlertAction(title: "Photo Library", style: .default, handler: {(action:UIAlertAction) in
                if UIImagePickerController.isSourceTypeAvailable(.photoLibrary)
                {
                    imagePicker.sourceType =  .photoLibrary
                    imagePicker.mediaTypes = [kUTTypeImage as String]
                    imagePicker.allowsEditing = false
                    self.present(imagePicker, animated: true, completion: nil)
                    
                }
                
            }))
            actionSheet.addAction(UIAlertAction(title: "Cancel", style: .default, handler:nil))
            self.present(actionSheet,animated: true,completion: nil)
            
        }
        
        
        
        
        
    }
    
    
    //Dismissing the full screen image view when the user tap anywhere
    func dismissFullscreenImage(sender: UITapGestureRecognizer) {
        sender.view?.removeFromSuperview()
    }
    
    //when the user cancel selecting the image picker menue
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController)
    {
        picker.dismiss(animated: true, completion: nil)
    }
    
    //when the user select or take an image. This function will update the corsponded image view and will show the delete button
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any])
    {
        let mediaType = info[UIImagePickerControllerMediaType] as! NSString
        if mediaType.isEqual(to: kUTTypeImage as String)
        {
            let image = info[UIImagePickerControllerOriginalImage]
                as! UIImage
            if imagePicked == 1
            {
                imageView1.setImage(image: image)
                imageView1.backgroundColor = .black
                deleteButton1.isHidden = false
                deleteButton1.isEnabled = true
            }
            else if imagePicked == 2
            {
                imageView2.setImage(image: image)
                imageView2.backgroundColor = .black
                deleteButton2.isHidden = false
                deleteButton2.isEnabled = true
            }
            else if imagePicked == 3
            {
                imageView3.setImage(image: image)
                imageView3.backgroundColor = .black
                deleteButton3.isHidden = false
                deleteButton3.isEnabled = true
            }
        }
        picker.dismiss(animated: true, completion: nil)
    }
    //-------------------------------------------------------------------------------//
    
    func checkPrice() -> Bool
    {
        if(price.text! == "") { return false }
        do
        {
            let regex = try NSRegularExpression(pattern:"^[1-9][1-9]?[1-9]?[1-9]?[1-9]?$")
            let matches = regex.matches(in: price.text!, options:[], range:NSRange(location:0,length:price.text!.utf16.count))
            if (matches.count>0)
            {
                let priceValue:Int? = Int(price.text!)
                if (priceValue != nil) {
                    if(priceValue! > 5000 || priceValue! < 0)
                    {
                        return false
                    }
                    else {
                        return true
                    }
                }
                else{
                    return false
                }
            }
        } catch {
            print("wrong regular expression")
            return false
        }
        
        return false
    }
    
    @IBAction func submit(_ sender: UIButton) {
        
        if(itemTitle.text! != "")
        {
            if(imageView1.set || imageView2.set || imageView3.set)
            {
            if(condition.text! != "")
            {
                if(checkPrice())
                {
                    if(productDesc.text.characters.count <= 200)
                    {
                        if(category.text! != "")
                        {
                            sendProductInfo()
                            reset()
                            
                        }else {
                            let alert = UIAlertController(title: "Missing Entry", message: "Please Select Category", preferredStyle: .alert)
                            alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                            self.present(alert,animated: true,completion: nil)
                            category.becomeFirstResponder()
                        }
                        
                    }else {
                        let alert = UIAlertController(title: "too long", message: "Description limit is 200 characters", preferredStyle: .alert)
                        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                        self.present(alert,animated: true,completion: nil)
                        productDesc.becomeFirstResponder()
                        
                    }
                    
                }else{
                    let alert = UIAlertController(title: "Price is not valid", message: "Price has to be a numbre between 0 and 5000", preferredStyle: .alert)
                    alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                    self.present(alert,animated: true,completion: nil)
                    price.becomeFirstResponder()
                }
                
            }else {
                let alert = UIAlertController(title: "Missing Entry", message: "Please Select Condition", preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                self.present(alert,animated: true,completion: nil)
                condition.becomeFirstResponder()
            }
            } else {
                let alert = UIAlertController(title: "Missing Entry", message: "Please upload atleast on picture of the item", preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                self.present(alert,animated: true,completion: nil)
            }
            
        }else {
            let alert = UIAlertController(title: "Missing Entry", message: "Please enter a title", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
            self.present(alert,animated: true,completion: nil)
            itemTitle.becomeFirstResponder()
            
        }
    }
    
    
    func sendProductInfo()
    {
        UIApplication.shared.beginIgnoringInteractionEvents()
        activityIndicator.stopAnimating()
        
        let serverip = Config.getServerIP()
        let parameters: [String: String] = [
            "title" : itemTitle.text!,
            "condition" : condition.text!,
            "price" : price.text!,
            "description":productDesc.text!,
            "category":category.text!]
        let token = KeychainAccess.getToken()
        if token == nil
        {
            let alert = UIAlertController(title: "Session Expired", message: "The token has been deleted, please login again to get a new token", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default, handler: {(action:UIAlertAction) in self.dismiss(animated: true, completion: nil)}))
            self.present(alert,animated: true,completion: nil)
            
        }
        else
        {
            let headers: HTTPHeaders = ["authorization":"Bearer "+token!]
            let URL = try! URLRequest(url: serverip+"/services/postproduct", method: .post, headers: headers)
            
            uploadImagesAndData(params: parameters,url:URL)
        }
        
        activityIndicator.stopAnimating()
        UIApplication.shared.endIgnoringInteractionEvents()
    }
    
    
    
    func uploadImagesAndData(params:[String : String]?,url :URLRequest ) -> Void
    {
        
        let image1Set:Bool = imageView1.set
        let image2Set:Bool = imageView2.set
        let image3Set:Bool = imageView3.set
        let image1 = imageView1.image!
        let image2 = imageView2.image!
        let image3 = imageView3.image!

        Alamofire.upload(multipartFormData: { multipartFormData in
            
            for (key, value) in params!
            {
                if let data = value.data(using: String.Encoding(rawValue: String.Encoding.utf8.rawValue))
                {
                    multipartFormData.append(data, withName: key)
                }
            }
            if(image1Set)
            {
                let imageData1 = UIImageJPEGRepresentation(image1, 0.1)!
                multipartFormData.append(imageData1, withName: "image", fileName: "image1.jpg", mimeType: "image/jpeg")
            }
            if(image2Set)
            {
                let imageData2 = UIImageJPEGRepresentation(image2, 0.1)!
                multipartFormData.append(imageData2, withName: "image", fileName: "image2.jpg", mimeType: "image/jpeg")
            }
            if(image3Set)
            {
                let imageData3 = UIImageJPEGRepresentation(image3, 0.1)!
                multipartFormData.append(imageData3, withName: "image", fileName: "image3.jpg", mimeType: "image/jpeg")
            }
            
            
        }, with:url , encodingCompletion: { encodingResult in
            switch encodingResult {
            case .success(let upload, _, _):
                upload
                    .validate()
                    .responseJSON { response in
                        switch response.result {
                        case .success(let value):
                            print("responseObject: \(value)")
                            let alert = UIAlertController(title: "Item Added", message: "Your item is successfully added", preferredStyle: UIAlertControllerStyle.alert)
                            alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
                            self.present(alert,animated: true,completion: nil)
                        case .failure(let responseError):
                            print("responseError: \(responseError)")
                            if(response.response?.statusCode == 401)
                            {
                                let alert = UIAlertController(title: "Expired Session", message: "It seems you logged in from another device, please log in again to refresh the session", preferredStyle:.alert)
                                alert.addAction(UIAlertAction(title: "OK", style: .default, handler: {(action:UIAlertAction) in self.dismiss(animated: true, completion: nil)}))
                                self.present(alert, animated: true, completion: nil)
                                KeychainAccess.resetPassword()
                                KeychainAccess.resetToken()
                                KeychainAccess.resetUsername()
                                
                            }
                        }
                }
            case .failure(let encodingError):
                print("encodingError: \(encodingError)")
            }
        })
    }
    
    
    
    func reset()
    {
        deleteAction(1)
        deleteAction(2)
        deleteAction(3)
        itemTitle.text = ""
        productDesc.text = ""
        category.text = ""
        condition.text = ""
        price.text = ""
        
    }
    
}








//A custom image view with a set value to check if the user set an image or not to avoid sending the default images to the server
final class CustomUIImageView : UIImageView
{
    var set:Bool = false
    init(image : UIImage, set : Bool, tap : UITapGestureRecognizer)
    {
        super.init(image: image)
        self.set = false
        self.addGestureRecognizer(tap)
    }
    func setImage(image:UIImage)
    {
        super.image = image
        self.set = true
    }
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
}
