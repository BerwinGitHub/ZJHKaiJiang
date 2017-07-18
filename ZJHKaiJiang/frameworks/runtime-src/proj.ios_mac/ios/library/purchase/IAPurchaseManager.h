//
//  PurchaseManager.h
//  slotsgame
//
//  Created by admin on 17/5/2.
//
//

#import <Foundation/Foundation.h>
#import "ILibraryAccess.h"
#import "PurchasedDelegate.h"
#import "Purchase.h"

@interface IAPurchaseManager : ILibraryAccess<PurchaseDelegate> // PurchaseDelegate这个是Purchse里面带的
{
    id<PurchasedDelegate>   _delegate;
    BOOL                    _isPurchasing;
    BOOL                    _isShowRestore;
}

+ (instancetype)getInstance;
+ (void)pure;

/**
 * 设置回调代理方法
 *
 * @param delegate
 *            实现的代理方法
 */
- (void)setDelegate:(id<PurchasedDelegate>)delegate;

/**
 * 通过商品id购买商品,商品默认为托管类型的
 *
 * @param sku
 *            商品的SKU
 */
- (void)purchase:(NSString*)sku;

/**
 * 购买非托管类型的商品，即消费品
 *
 * @param sku
 *            商品的SKU
 */
- (void)purchaseUnmanaged:(NSString*)sku;

/**
 * 恢复已经购买的产品
 *
 * @param isLocal is just only for Android platform. this param not effect IOS platform.
 *        see this in Android method (query).
 *
 */
- (void)restore;

@end
