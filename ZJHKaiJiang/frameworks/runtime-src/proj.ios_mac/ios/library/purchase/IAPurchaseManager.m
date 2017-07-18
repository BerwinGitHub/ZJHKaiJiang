//
//  PurchaseManager.m
//  slotsgame
//
//  Created by admin on 17/5/2.
//
//

#import "IAPurchaseManager.h"

#define ALERT_PUR_SUC   @"Thank you for your purchase."
#define ALERT_PUR_FIL   @"Purchase failed. Please try again later."
#define ALERT_PUR_CAN   @"Your purchase was canceled. No purchase was made and your account was not charged."
#define ALERT_PUR_NRE   @"Purchase is not ready."
#define ALERT_RES_FIL   @"Restore Failed! We could not find any previous purchases."
#define ALERT_RES_SUC   @"Restore successfully!"
#define ALERT_RES_FIL2  @"We have detected a problem restoring your purchases. No purchases were restored. Please check your device settings and storage and try again later."

@implementation IAPurchaseManager

static IAPurchaseManager *_instance = nil;

+ (instancetype)getInstance
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance = [[self alloc] init];
    });
    
    return _instance;
}

+ (void)pure
{
    if(_instance){
        [_instance release];
        _instance = nil;
    }
}


#pragma mark - override
- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug
{
    [super setUpEnvironment:viewController withDebug:debug];
    return YES;
}

- (void)dealloc
{
    [[Purchase getInstance] setDelegate:nil];
    _delegate = nil;
    _instance = nil;
    [super dealloc];
}

#pragma mark - purchase method
- (void)setDelegate:(id<PurchasedDelegate>)delegate
{
    _delegate = delegate;
    _isPurchasing = NO;
}

- (void)purchase:(NSString*)sku
{
    if (!_isPurchasing)
    {
        _isPurchasing = YES;
        
        [[Purchase getInstance] setDelegate:self];
        [[Purchase getInstance] startRequestWithProductIdentifier:sku];
    }
}

- (void)purchaseUnmanaged:(NSString*)sku
{
    // on IOS platform, this method the same as purchase:(NSString*)sku
    [self purchase:sku];
}

- (void)restore
{
    if (!_isPurchasing)
    {
        _isShowRestore = FALSE;
        _isPurchasing = YES;
        
        [[Purchase getInstance] setDelegate:self];
        [[Purchase getInstance] restorePurchase];
    }
}

#pragma mark 购买的回调
- (void)purchaseSuccess:(Purchase *)purchase
{
    [self alertMessage:ALERT_PUR_SUC];
    
    //通知公共
    if (_delegate)
    {
        [_delegate purchaseSuccessful:purchase.curProductID];
    }
}

- (void)purchaseFailed:(Purchase *)purchase
{
    [self alertMessage:ALERT_PUR_FIL];
    
    //
    if (_delegate) {
        [_delegate purchaseFailed:purchase.curProductID withErrorCode:0];
    }
}

- (void)restoreFinishedWithPaymentTransitions:(NSArray*)transitions
{
    if (transitions.count == 0) {
        [self alertMessage:ALERT_RES_FIL];
    }
}

- (void)restoreCompletedWithProductIdentifiers:(NSArray *)productIdentifiers
{
    if (_delegate)
    {
        for (int i=0; i<[productIdentifiers count]; i++) {
            NSString* productKey = [productIdentifiers objectAtIndex:i];
            [_delegate restoreSuccessful:productKey];
        }
        if([productIdentifiers count]==0){
            [self alertMessage:ALERT_RES_FIL];
            [_delegate restoreSuccessfulNotify:YES];
        }else{
            [self alertMessage:ALERT_RES_SUC];
            [_delegate restoreSuccessfulNotify:YES];
        }
        
    }
    
}

- (void)restoreFailed:(Purchase *)purchase
{
    [self alertMessage:ALERT_RES_FIL2];
    
    if (_delegate)
    {
        [_delegate restoreFailed:purchase.curProductID withErrorCode:0];
    }
}

- (void)purchaseCanceled:(Purchase *)purchase
{
    [self alertMessage:ALERT_PUR_CAN];
    if (_delegate)
    {
        [_delegate restoreFailed:purchase.curProductID withErrorCode:0];
    }
}

// 开始请求 显示一个半透明的View
- (void)productRequestBegin:(Purchase *)purchase
{
    UIWindow *curWindow=[[[UIApplication sharedApplication] windows] objectAtIndex:0];
    CGRect screenRect=[UIScreen mainScreen].applicationFrame;
    UIView *bgView=[[UIView alloc] initWithFrame:CGRectMake(0, 0,  screenRect.size.width,  screenRect.size.height)];
    [bgView setBackgroundColor:[UIColor colorWithRed:0.0 green:0.0 blue:0.0 alpha:0.5]];
    [bgView setTag:100000];
    UIActivityIndicatorView *acView=[[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite];
    acView.center=CGPointMake(screenRect.size.width/2.0f, screenRect.size.height/2.0f);
    [acView setTag:200000];
    [bgView addSubview:acView];
    [acView release];
    [curWindow addSubview:bgView];
    [curWindow bringSubviewToFront:bgView];
    [bgView release];
    [acView startAnimating];
}

// 请求结束关闭半透明的View
- (void)productRequestEnd:(Purchase *)purchase
{
    UIWindow *curWindow=[[[UIApplication sharedApplication] windows] objectAtIndex:0];
    UIView *bgView=[curWindow viewWithTag:100000];
    UIActivityIndicatorView *acView=(UIActivityIndicatorView*)[bgView viewWithTag:200000];
    if (acView) {
        [acView stopAnimating];
        [acView removeFromSuperview];
    }
    if (bgView) {
        [bgView removeFromSuperview];
    }
    
    //[[Purchase getInstance] setDelegate:nil];
    
    _isPurchasing = NO;
}

- (void)productsNotReady:(Purchase *)purchase
{
    [self alertMessage:ALERT_PUR_NRE];
}

- (void)purchaseRestored:(Purchase *)purchase
{
    if (!_isShowRestore) {
        [self alertMessage:ALERT_RES_SUC];
        _isShowRestore = YES;
    }
    
    NSLog(@"[purchase.curProductID UTF8String] %s", [purchase.curProductID UTF8String]);
    if (_delegate)
    {
        [_delegate restoreSuccessful:purchase.curProductID];
    }
}


#pragma mark 私有方法
- (void)alertMessage:(NSString *)message
{
    UIAlertView* alert = [[UIAlertView alloc] initWithTitle:nil message:message delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
    [alert show];
    [alert release];
}

@end
