//
//  BannerManager.h
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import "IBannerAccess.h"
#import "IManagerAccess.h"

@interface BannerManager : IManagerAccess

+ (instancetype)getInstance;
+ (void)pure;

/**
 * 得到Banner的显示的位置
 * #return BOOL Banner当前展示的位置
 */
- (int)getGravity;

/**
 * 设置Banner的显示的位置
 * @param gravity  Banner的位置枚举参数(参考：IAdAccess->AdType)
 */
- (void)setGravity:(int)gravity;

@end
