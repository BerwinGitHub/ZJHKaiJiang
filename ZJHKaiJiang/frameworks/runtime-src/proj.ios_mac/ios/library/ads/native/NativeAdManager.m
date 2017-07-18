//
//  NativeAdManager.m
//  HotFixer
//
//  Created by 唐博文 on 2017/6/6.
//
//

#import "NativeAdManager.h"
#import "INativeAdAccess.h"
#import "NativeAdAdmob.h"
#import "Utility.h"

@implementation NativeAdManager

//@synthesize adArray = _adArray;

static NativeAdManager *_instance = nil;

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

- (BOOL)setUpEnvironment:(UIViewController*)viewController withQueue:(NSArray*)queue andDebug:(BOOL)debug
{
    [super setUpEnvironment:viewController withQueue:queue andDebug:debug];
    self.viewController = viewController;
    INativeAdAccess *adomb = [[NativeAdAdmob alloc] init];
    [(NativeAdAdmob*)adomb setRootView:[self getNativeAdRootViewInstance:viewController]];
    [adomb setUpEnvironment:viewController withDebug:debug];
    [self.adArray addObject:adomb];
    // 调整顺序
    [self sortAdWithAgentQueue:queue];
    // 将进度条界面放到最上面
    [self.rootView bringSubviewToFront:self.progressRootView];
    // 开始预加载广告
    [self preload];
    [self updateProgress:0];
    return YES;
}

- (BOOL)show
{
    self.meetMinTime = NO;
    [[self getNativeAdRootViewInstance:self.viewController] setHidden:NO];// 显示节点
    dispatch_time_t time0 = dispatch_time(DISPATCH_TIME_NOW, NATIVEAD_TIME * NSEC_PER_SEC);
    dispatch_after(time0, dispatch_get_main_queue(), ^{
        self.meetMinTime = YES;
        [self shouldHideNativeAd];
    });
    // for test
    dispatch_time_t time1 = dispatch_time(DISPATCH_TIME_NOW, NATIVEAD_TIME * 0.7 * NSEC_PER_SEC);
    dispatch_after(time1, dispatch_get_main_queue(), ^{
        [self updateProgress:1.0f];
    });
    return [super show];
}


- (void)hide
{
    [super hide];
    if(self.rootView != nil) {
        [self.rootView setHidden:YES];
    }
    // 重置进度为0
    [self updateProgress:0];
}

- (UIView*)getNativeAdRootViewInstance:(UIViewController*)vc
{
    if(self.rootView == nil){ // 如果根节点不存在那就创建
        CGRect rect = [Utility screenRect];
        self.rootView = [[UIView alloc] initWithFrame:rect];
//        self.rootView.backgroundColor = [UIColor colorWithRed:106 / 255.0f green:26 / 255.0f blue:147 / 255.0f alpha:1.0];
        self.rootView.backgroundColor = [UIColor colorWithRed:1.0f green:1.0f blue:1.0f alpha:1.0f];
        [vc.view addSubview:self.rootView];
        // 初始化进度条View
        CGRect pgrRect = CGRectMake(0, rect.size.height - PROGRESS_VIEW_HEIGHT, rect.size.width, PROGRESS_VIEW_HEIGHT);
        self.progressRootView = [[UIView alloc] initWithFrame:pgrRect];
        self.progressRootView.backgroundColor = UIColor(61, 66, 83, 220);
        [self.rootView addSubview:self.progressRootView];
        // progress
        CGRect pgRect = CGRectMake(16, 8, rect.size.width - (16 << 1), 8);
        self.progressView = [[UIProgressView alloc] initWithFrame:pgRect];
        self.progressView.progressViewStyle = UIProgressViewStyleDefault;// UIProgressViewStyleDefault
        [self.progressRootView addSubview:self.progressView];
        self.progressView.progress = 0.0;
        // label
        CGRect lblRect = CGRectMake(pgRect.origin.x + pgRect.size.width - 40, pgRect.origin.y + pgRect.size.height, 40, 10);
        self.progressTxt = [[UILabel alloc] initWithFrame:lblRect];
        self.progressTxt.font = [UIFont systemFontOfSize:10];
        self.progressTxt.textAlignment = NSTextAlignmentRight;
        self.progressTxt.textColor = UIColor(255, 255, 255, 255);
        self.progressTxt.text = @"0%";
        [self.progressRootView addSubview:self.progressTxt];
    }
    return self.rootView;
}

- (void)updateProgress:(float)v
{
    self.progressView.progress = v;
    self.progressTxt.text = [NSString stringWithFormat:@"%d%%", (int)(v * 100)];
    [self shouldHideNativeAd];
}

- (void)shouldHideNativeAd
{
    if(self.meetMinTime && self.progressView.progress >= 1.0f){
        self.meetMinTime = NO;
        [self hide];
    }
}

@end
