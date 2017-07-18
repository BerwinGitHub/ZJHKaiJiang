//
//  NativeAdManager.h
//  HotFixer
//
//  Created by 唐博文 on 2017/6/6.
//
//

#import "IManagerAccess.h"

#define     PROGRESS_VIEW_HEIGHT    60
#define     NATIVEAD_TIME           30

@interface NativeAdManager : IManagerAccess

@property(nonatomic, strong)UIView *rootView;
@property(nonatomic, strong)UIView *progressRootView;
@property(nonatomic, strong)UIProgressView *progressView;
@property(nonatomic, strong)UILabel *progressTxt;
@property(nonatomic, strong)UIViewController *viewController;

@property(nonatomic, assign)BOOL meetMinTime;

+ (instancetype)getInstance;
+ (void)pure;

- (UIView*)getNativeAdRootViewInstance:(UIViewController*)vc;

- (void)updateProgress:(float)v;

@end
