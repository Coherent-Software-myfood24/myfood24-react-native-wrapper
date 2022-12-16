import MyFood24
import UIKit
@objc(Myfood24Digibete)
class Myfood24Digibete: NSObject {

  @objc(multiply:withB:withResolver:withRejecter:)
  func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    resolve(a*b)
  }
    
    @objc(test)
    func test(){
        
        print("Hello world")
        let VC = MyFood24.initMyFood24(onDismissCallback: {
            print("Do something here when you're done")
        })
        
        DispatchQueue.main.async {
            let viewController = UIApplication.shared.keyWindow?.rootViewController
            viewController!.present(VC, animated: true)
        }

//        viewController!.present(VC, animated: true)

    }
    @objc(divide:withB:withResolver:withRejecter:)
    func divide(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
      resolve(a/b)
    }
}
