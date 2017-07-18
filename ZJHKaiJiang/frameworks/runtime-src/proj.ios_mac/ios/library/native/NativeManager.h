//
//  NativeManager.h
//  slotsgame
//
//  Created by admin on 17/5/2.
//
//

#import "ILibraryAccess.h"

typedef void(^AlertCompleteBlock)(NSInteger buttonIndex);

@interface NativeManager : ILibraryAccess

/**
 * alert回调监听属性(block)
 */
@property(nonatomic, copy)AlertCompleteBlock alertCompleteBlock;

@property (nonatomic,strong)UIPopoverController* activityPopover;

+ (instancetype)getInstance;
+ (void)pure;

/**
 * 检查网络状态是否可用
 * @return BOOL 
 */
- (BOOL)isNetworkAvaliable;

/**
 * 得到设备的唯一ID(UUID)
 * @return NSString 设备的唯一ID
 */
- (NSString*)getDeviceUUID;

/**
 * 显示AlertDialog
 * @return NSString 设备的唯一ID
 */
- (void)showAlertDialog:(NSString*)titile withContent:(NSString*)content positiveName:(NSString*)positive negativeName:(NSString*)negative listener:(AlertCompleteBlock)listener;

/**
 * 在应用内显示网页
 */
- (void)showInAppWeb:(NSString*)url;

/**
 * 系统自带的分享
 */
- (void)systemShareWithTitile:(NSString*)title content:(NSString*)content imageUrl:(NSString*)imgUrl;

- (void)makeToast:(NSString*)msg withTime:(long)millis;

@end
