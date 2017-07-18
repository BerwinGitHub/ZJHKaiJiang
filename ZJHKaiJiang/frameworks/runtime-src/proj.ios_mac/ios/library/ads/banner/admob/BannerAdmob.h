//
//  BannerAdmob.h
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import <Foundation/Foundation.h>
#import "IBannerAccess.h"

@import GoogleMobileAds;

@class GADBannerView;

@interface BannerAdmob : IBannerAccess <GADBannerViewDelegate>

@property(nonatomic, strong)GADBannerView *bannerView;


@end
