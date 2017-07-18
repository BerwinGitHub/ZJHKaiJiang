//
//  Purchase.m
//  POKI0001
//
//

#import "Purchase.h"

@interface Purchase ()

@property (nonatomic, retain)SKProductsRequest *productRequest;
@property (nonatomic, retain)NSMutableSet* restoredProductIds;

@end

@implementation Purchase

@synthesize curProductID    = _curProductID;
@synthesize delegate        = _delegate;
@synthesize productRequest;

static Purchase *instance = nil;

- (id)init {
    self = [super init];
    if (self) {
        _restoredProductIds = [[NSMutableSet alloc] init];
        [[SKPaymentQueue defaultQueue] addTransactionObserver:self];
    }
    return self;
}

- (void)dealloc {
    [_curProductID release];
    [[SKPaymentQueue defaultQueue] removeTransactionObserver:self];
    
    self.restoredProductIds = nil;
    
    [super dealloc];
}

+ (Purchase *)getInstance {
    if (instance == nil) {
        instance = [[self alloc] init];
    }
    return instance;
}

- (void)startRequestWithProductIdentifier:(NSString *)identifier {
    //  add the transparent bg layer
    if (_delegate && [_delegate respondsToSelector:@selector(productRequestBegin:)]) {
        [_delegate productRequestBegin:self];
    }
    
    self.curProductID = identifier;
    self.productRequest=[[[SKProductsRequest alloc] initWithProductIdentifiers:[NSSet setWithObject:_curProductID]] autorelease];
    self.productRequest.delegate=self;
    [self.productRequest start];
}

- (void)restorePurchase {
    //  add the transparent bg layer
    if (_delegate && [_delegate respondsToSelector:@selector(productRequestBegin:)]) {
        [_delegate productRequestBegin:self];
    }
    
    [[SKPaymentQueue defaultQueue] restoreCompletedTransactions];
}

#pragma mark - SKProductsRequestDelegate

- (void)productsRequest:(SKProductsRequest *)request didReceiveResponse:(SKProductsResponse *)response {
    
    self.productRequest = nil;
    // last product
    SKProduct *curProduct=[[response products] lastObject];
    // product not exit
    if(curProduct==nil) {
        
        //  products not ready
        if (_delegate && [_delegate respondsToSelector:@selector(productsNotReady:)]) {
            [_delegate productsNotReady:self];
        }
        
        //  request end
        if (_delegate && [_delegate respondsToSelector:@selector(productRequestEnd:)]) {
            [_delegate productRequestEnd:self];
        }
        
        return;
    }
    
    SKPayment *payment = [SKPayment paymentWithProduct:curProduct];             //get current purchase product info(num&price)
    [[SKPaymentQueue defaultQueue] addPayment:payment];                         //insert product to pay query,the delegate will update product.
}

- (void)request:(SKRequest *)request didFailWithError:(NSError *)error {
    
    self.productRequest = nil;
    //  user canceled
    if (error.code == SKErrorPaymentCancelled) {
        if (_delegate && [_delegate respondsToSelector:@selector(purchaseCanceled:)]) {
            [_delegate purchaseCanceled:self];
        }
    }else {
        // request failed
        if (_delegate && [_delegate respondsToSelector:@selector(purchaseFailed:)]) {
            [_delegate purchaseFailed:self];
        }
    }
    
    //  request end
    if (_delegate && [_delegate respondsToSelector:@selector(productRequestEnd:)]) {
        [_delegate productRequestEnd:self];
    }
}

#pragma mark - SKPaymentTransactionObserver

- (void)paymentQueue:(SKPaymentQueue *)queue updatedTransactions:(NSArray *)transactions {
    
    NSLog(@"transaction count:%d",(int)[transactions count]);
    
    for(SKPaymentTransaction *transaction in transactions) {
        
        self.curProductID = transaction.payment.productIdentifier;
        switch((int)transaction.transactionState) {
                
            case SKPaymentTransactionStatePurchased: {
                
                NSLog(@"transaction purchased");
                
                if (_delegate && [_delegate respondsToSelector:@selector(purchaseSuccess:)]) {
                    [_delegate purchaseSuccess:self];
                }
                if (_delegate && [_delegate respondsToSelector:@selector(productRequestEnd:)]) {
                    [_delegate productRequestEnd:self];
                }
                
                [[SKPaymentQueue defaultQueue] finishTransaction:transaction];
                break;
            }
            case SKPaymentTransactionStateRestored: {
                
                NSLog(@"transaction restored");
                
                [self.restoredProductIds addObject:transaction.payment.productIdentifier];
                [[SKPaymentQueue defaultQueue] finishTransaction: transaction];
                
                break;
            }
            case SKPaymentTransactionStateFailed: {
                
                NSLog(@"fail transaction %@",[transaction.error localizedDescription]);
                
                //  user canceled
                if (transaction.error.code == SKErrorPaymentCancelled) {
                    if (_delegate && [_delegate respondsToSelector:@selector(purchaseCanceled:)]) {
                        [_delegate purchaseCanceled:self];
                    }
                }else {
                    if (_delegate && [_delegate respondsToSelector:@selector(purchaseFailed:)]) {
                        [_delegate purchaseFailed:self];
                    }
                }
                //  ui refresh
                if (_delegate && [_delegate respondsToSelector:@selector(productRequestEnd:)]) {
                    [_delegate productRequestEnd:self];
                }
                
                [[SKPaymentQueue defaultQueue] finishTransaction: transaction];
                break;
            }
        }
    }
}

- (void) paymentQueue:(SKPaymentQueue *)queue restoreCompletedTransactionsFailedWithError:(NSError *)error {
    
    if (error.code == SKErrorPaymentCancelled) {
        if (_delegate && [_delegate respondsToSelector:@selector(restoreCanceled:)]) {
            [_delegate restoreCanceled:self];
        }
    }else {
        //  restore failed
        if (_delegate && [_delegate respondsToSelector:@selector(restoreFailed:)]) {
            [_delegate restoreFailed:self];
        }
    }
    
    //  request end
    if (_delegate && [_delegate respondsToSelector:@selector(productRequestEnd:)]) {
        [_delegate productRequestEnd:self];
    }
}

- (void) paymentQueueRestoreCompletedTransactionsFinished:(SKPaymentQueue *)queue {
    if ([self.delegate respondsToSelector:@selector(restoreCompletedWithProductIdentifiers:)]) {
        [self.delegate restoreCompletedWithProductIdentifiers:[self.restoredProductIds allObjects]];
    }
    
    if (_delegate && [_delegate respondsToSelector:@selector(productRequestEnd:)]) {
        [_delegate productRequestEnd:self];
    }
}

@end
