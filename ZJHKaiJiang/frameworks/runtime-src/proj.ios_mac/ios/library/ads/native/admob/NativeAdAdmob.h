//
//  NativeAdAdmob.h
//  HotFixer
//
//  Created by 唐博文 on 2017/6/6.
//
//

#import "INativeAdAccess.h"
@import GoogleMobileAds;

@interface NativeAdAdmob : INativeAdAccess<GADNativeExpressAdViewDelegate, GADVideoControllerDelegate>

@property(nonatomic, strong)GADNativeExpressAdView *nativeAdView;
@property(nonatomic, strong)UIView *rootView;

@end
