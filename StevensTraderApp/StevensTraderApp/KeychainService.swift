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
let identifier:String = "StevensTraderToken"
struct KeychainAccess {
    
    static func setPasscode(passcode: String) {
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
    static func resetPasscode()
    {
        let keychainQuery = [
            kSecClassValue: kSecClassGenericPasswordValue,
            kSecAttrServiceValue: identifier,
            ] as CFDictionary
        SecItemDelete(keychainQuery)
    }
    
    static func getPasscode() -> String? {
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
