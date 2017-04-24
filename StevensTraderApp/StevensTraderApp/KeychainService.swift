import UIKit
import Security

let kSecClassGenericPasswordValue = String(format: kSecClassGenericPassword as String)
let kSecClassValue = String(format: kSecClass as String)
let kSecAttrServiceValue = String(format: kSecAttrService as String)
let kSecValueDataValue = String(format: kSecValueData as String)
let kSecMatchLimitValue = String(format: kSecMatchLimit as String)
let kSecReturnDataValue = String(format: kSecReturnData as String)
let kSecMatchLimitOneValue = String(format: kSecMatchLimitOne as String)
let kSecAttrAccountValue = String(format: kSecAttrAccount as String)
let tokenIdentifier:String = "StevensTraderToken"
let usernameIdentifier:String = "StevensTraderUsername"
let passwordIdentifier:String = "StevensTraderPassword"
struct KeychainAccess {
    
    
    
    //Token Keychain functions
    static func setToken(_ token:String)
    {
        setPasscode(token, tokenIdentifier)
    }
    static func resetToken()
    {
        resetPasscode(tokenIdentifier)
    }
    static func getToken() -> String?
    {
        return getPasscode(tokenIdentifier)
    }
    
    //Username Keychain functions
    static func setUsername(_ username:String)
    {
        setPasscode(username, usernameIdentifier)
    }
    static func resetUsername()
    {
        resetPasscode(usernameIdentifier)
    }
    static func getUsername() -> String?
    {
        return getPasscode(usernameIdentifier)
    }
    
    
    
    //Password Keychain functions
    static func setPassword(_ password:String)
    {
        setPasscode(password, passwordIdentifier)
    }
    static func resetPassword()
    {
        resetPasscode(passwordIdentifier)
    }
    static func getPassword() -> String?
    {
        return getPasscode(passwordIdentifier)
    }
    
    
    fileprivate static func setPasscode(_ passcode: String,_ identifier:String) {
        if let dataFromString = passcode.data(using: String.Encoding.utf8) {
            let keychainQuery = [
                kSecClassValue: kSecClassGenericPasswordValue,
                kSecAttrServiceValue: identifier,
                kSecValueDataValue: dataFromString
                ] as CFDictionary
            SecItemDelete(keychainQuery)
            print(SecItemAdd(keychainQuery, nil))
            
        }
    }
   fileprivate static func resetPasscode(_ identifier:String)
    {
        let keychainQuery = [
            kSecClassValue: kSecClassGenericPasswordValue,
            kSecAttrServiceValue: identifier,
            ] as CFDictionary
        SecItemDelete(keychainQuery)
    }
    
    fileprivate static func getPasscode(_ identifier:String) -> String? {
        let keychainQuery = [
            kSecClassValue: kSecClassGenericPasswordValue,
            kSecAttrServiceValue: identifier,
            kSecReturnDataValue: kCFBooleanTrue,
            kSecMatchLimitValue: kSecMatchLimitOneValue
            ] as  CFDictionary
        var dataTypeRef: AnyObject?
        let status: OSStatus = SecItemCopyMatching(keychainQuery, &dataTypeRef)
        var passcode: String?
        if (status == errSecSuccess)
        {
            if let retrievedData = dataTypeRef as? Data,
                let result = String(data: retrievedData, encoding: String.Encoding.utf8)
            {
                passcode = result as String
            }
        }
        else {
            print("Nothing was retrieved from the keychain. Status code \(status)")
            return nil
        }
        return passcode
    }
}
