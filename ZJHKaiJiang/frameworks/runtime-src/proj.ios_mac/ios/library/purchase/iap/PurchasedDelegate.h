//
//  PurchaseDelegate.h
//  slotsgame
//
//  Created by admin on 17/5/2.
//
//

#import <Foundation/Foundation.h>

@protocol PurchasedDelegate <NSObject>

@required
/**
 * 购买成功后的回调方法，用来更新IAP的状态
 *
 * @param sku
 *            已经购买到的商品sku
 */
- (void)purchaseSuccessful:(NSString*)pid;

/**
 * 购买失败后的回调方法
 */
- (void)purchaseFailed:(NSString*)pid withErrorCode:(int)errorCode;

/**
 * Restore成功后的回调方法，用来更新IAP的状态
 *
 * @param sku
 *            已经购买到的商品sku
 */
- (void)restoreSuccessful:(NSString*)pid;

/**
 * restore失败后的回调方法
 */
- (void)restoreFailed:(NSString*)pid withErrorCode:(int)errorCode;


/**
 * restore成功的广播
 */
- (void)restoreSuccessfulNotify:(BOOL)isPurchase;

@end
