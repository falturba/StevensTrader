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
class SellViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate, UIPickerViewDelegate,UIPickerViewDataSource, UITextFieldDelegate, UITextViewDelegate
{
    
    @IBOutlet weak var price: UITextField!
    @IBOutlet weak var itemTitle: UITextField!
    var deleteButton1 = UIButton(type:.system)
    var deleteButton2 = UIButton(type:.system)
    var deleteButton3 = UIButton(type:.system)
    var imagePicked = 0
    let coniditionList = ["New","Refurbished","Used","Very Good","Good","Acceptable"]
    @IBOutlet weak var imageView1: CustomUIImageView!
    @IBOutlet weak var imageView2: CustomUIImageView!
    @IBOutlet weak var imageView3: CustomUIImageView!
    @IBOutlet var condition: UITextField!
    @IBOutlet var conditionDropDown: UIPickerView!
    @IBOutlet weak var productDesc: UITextView!
    
  
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action:#selector(UIInputViewController.dismissKeyboard))
        tap.cancelsTouchesInView = true
        view.addGestureRecognizer(tap)
        
        self.condition.allowsEditingTextAttributes = false
        
        let imageTaps1 = UITapGestureRecognizer(target: self, action: #selector(handleImageTap))
        let imageTaps2 = UITapGestureRecognizer(target: self, action: #selector(handleImageTap))
        let imageTaps3 = UITapGestureRecognizer(target: self, action: #selector(handleImageTap))
        imageTaps1.numberOfTapsRequired = 1
        imageTaps2.numberOfTapsRequired = 1
        imageTaps3.numberOfTapsRequired = 1
        imageView1.addGestureRecognizer(imageTaps1)
        imageView2.addGestureRecognizer(imageTaps2)
        imageView3.addGestureRecognizer(imageTaps3)
        setDeleteButton(button: deleteButton1, imageView: imageView1)
        setDeleteButton(button: deleteButton2, imageView: imageView2)
        setDeleteButton(button: deleteButton3, imageView: imageView3)
        self.condition.delegate = self
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
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return coniditionList.count
    }
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return coniditionList[row]
    }
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        condition.text = coniditionList[row]
        self.conditionDropDown.isHidden = true
    }
    func textFieldDidBeginEditing(_ textField: UITextField) {
        if textField == self.condition
        {
            self.conditionDropDown.isHidden = false
            textField.endEditing(true)
        }
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        self.view.endEditing(true)
        return false
    }
    //------------------------------Image Views Functions ---------------------------//
    //Setting a hidden delete buttons that will appear when the user select an image
    func setDeleteButton(button:UIButton,imageView:CustomUIImageView)
    {
        button.isHidden = true
        button.translatesAutoresizingMaskIntoConstraints = false
        button.backgroundColor = .red
        button.setTitle("delete", for: .normal)
        button.addTarget(self, action: #selector(deleteImage), for:.touchUpInside)
        button.tag = imageView.tag
        let yc =  button.centerYAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 12)
        let xc = button.centerXAnchor.constraint(equalTo: imageView.centerXAnchor)
        let width =  button.widthAnchor.constraint(equalTo: imageView.widthAnchor)
        let height =  button.heightAnchor.constraint(equalToConstant: 20)
        let con = [yc,xc,width,height]
        self.view.addSubview(button)
        NSLayoutConstraint.activate(con)
    }
    
    //replace the selecting image with the default && hide the delete button
    func deleteImage(_ sender:UIButton)
    {
        switch(sender.tag)
        {
        case 1:
            imageView1.image = #imageLiteral(resourceName: "camera")
            sender.isHidden = true
            imageView1.set = false
            break
        case 2:
            imageView2.image = #imageLiteral(resourceName: "camera")
            sender.isHidden = true
            imageView2.set = false
            break
        case 3:
            imageView3.image = #imageLiteral(resourceName: "camera")
            sender.isHidden = true
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
                deleteButton1.isHidden = false
            }
            else if imagePicked == 2
            {
                imageView2.setImage(image: image)
                deleteButton2.isHidden = false
            }
            else if imagePicked == 3
            {
                imageView3.setImage(image: image)
                deleteButton3.isHidden = false
            }
        }
        picker.dismiss(animated: true, completion: nil)
    }
    //-------------------------------------------------------------------------------//
    
    @IBAction func submit(_ sender: UIButton) {
        let serverip = Config.getServerIP()
        let parameters: [String: String] = [
            "title" : itemTitle.text!,
            "condition" : condition.text!,
            "price" : price.text!,]
        let token = KeychainAccess.getPasscode()
        if token == nil
        {
            self.dismiss(animated: true, completion: nil)
        }
        else
        {
        let headers: HTTPHeaders = ["authorization":"Bearer "+token!]
        let URL = try! URLRequest(url: serverip+"/services/postproduct", method: .post, headers: headers)
       
        uploadImagesAndData(params: parameters,image1: imageView1.image!,image2: imageView2.image!,image3: imageView3.image!,url:URL)
        }
        
        
}
    
    
    func uploadImagesAndData(params:[String : String]?,image1: UIImage,image2: UIImage,image3: UIImage,url :URLRequest ) -> Void {
        
        
        let imageData1 = UIImageJPEGRepresentation(image1, 0.5)!
        let imageData2 = UIImageJPEGRepresentation(image2, 0.5)!
        let imageData3 = UIImageJPEGRepresentation(image3, 0.5)!
        
        
        Alamofire.upload(multipartFormData: { multipartFormData in
            
            for (key, value) in params! {
                if let data = value.data(using: String.Encoding(rawValue: String.Encoding.utf8.rawValue)) {
                    multipartFormData.append(data, withName: key)
                }
            }
      
            multipartFormData.append(imageData1, withName: "image", fileName: "image.jpg", mimeType: "image/jpeg")
            multipartFormData.append(imageData2, withName: "image", fileName: "image.jpg", mimeType: "image/jpeg")
            multipartFormData.append(imageData3, withName: "image", fileName: "image.jpg", mimeType: "image/jpeg")
        }, with:url , encodingCompletion: { encodingResult in
                            switch encodingResult {
                            case .success(let upload, _, _):
                                upload
                                    .validate()
                                    .responseJSON { response in
                                        switch response.result {
                                        case .success(let value):
                                            print("responseObject: \(value)")
                                        case .failure(let responseError):
                                            print("responseError: \(responseError)")
                                            if(response.response?.statusCode == 401)
                                            {
                                                KeychainAccess.resetPasscode()
                                                self.dismiss(animated: true, completion: nil)
                                            }
                                        }
                                }
                            case .failure(let encodingError):
                                print("encodingError: \(encodingError)")
                            }
        })
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
