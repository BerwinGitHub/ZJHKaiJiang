//
//  Purchase.h
//  POKI0001
//
//

#import <Foundation/Foundation.h>
#import <StoreKit/StoreKit.h>

@protocol PurchaseDelegate;
@interface Purchase : NSObject <SKProductsRequestDelegate, SKPaymentTransactionObserver> {
    NSString                *_curProductID;
    id<PurchaseDelegate>  _delegate;
}

+ (Purchase *)getInstance;

- (void)startRequestWithProductIdentifier:(NSString *)identifier;
- (void)restorePurchase;

@property (nonatomic, copy) NSString *curProductID;
@property (nonatomic, assign) id<PurchaseDelegate> delegate;

@end


@protocol PurchaseDelegate <NSObject>
@required
- (void)purchaseSuccess:(Purchase *)purchase;
- (void)purchaseFailed:(Purchase *)purchase;

@optional
- (void)restoreFailed:(Purchase *)purchase;

// this delegate for all pruchsed products restore successfully.
// productIdentifiers contain each product id。
// if not pruchase product. so productIdentifiers size is zero.tell user not pruchase.
// otherwise excute restore method.
- (void)restoreCompletedWithProductIdentifiers:(NSArray *)productIdentifiers;

- (void)purchaseCanceled:(Purchase *)purchase;
- (void)restoreCanceled:(Purchase *)purchase;

- (void)productRequestBegin:(Purchase *)purchase;
- (void)productRequestEnd:(Purchase *)purchase;

- (void)productsNotReady:(Purchase *)purchase;

@end
