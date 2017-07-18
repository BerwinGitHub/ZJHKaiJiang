//
//  IBannerAccess.h
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import "IAdAccess.h"

@interface IBannerAccess : IAdAccess

// Banner的位置类型
typedef NS_ENUM(NSInteger, Gravity){
    kGravityTop     = 0,    // Banner(横幅)广告在顶<🔼>部显示
    kGravityBottom  = 1,    // Banner(横幅)广告在底<🔽>部显示
};

/**
 * 广告的位置信息，
 */
@property(nonatomic, readwrite)int gravity;

@end
