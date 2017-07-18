//
//  NativeManager.m
//  slotsgame
//
//  Created by admin on 17/5/2.
//
//

#import "NativeManager.h"
#import <SystemConfiguration/SystemConfiguration.h>
#import <netinet/in.h>
#import <AdSupport/AdSupport.h>
#import "InAppWebView.h"
#import "Utility.h"

@implementation NativeManager

static NativeManager *_instance = nil;

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

-(BOOL)isNetworkAvaliable {
    struct sockaddr_in zeroAddress;
    bzero(&zeroAddress, sizeof(zeroAddress));
    zeroAddress.sin_len = sizeof(zeroAddress);
    zeroAddress.sin_family = AF_INET;
    
    SCNetworkReachabilityRef defaultRouteReachability = SCNetworkReachabilityCreateWithAddress(NULL, (struct sockaddr *)&zeroAddress);
    SCNetworkReachabilityFlags flags;
    
    BOOL didRetrieveFlags = SCNetworkReachabilityGetFlags(defaultRouteReachability, &flags);
    CFRelease(defaultRouteReachability);
    
    if (!didRetrieveFlags) {
        return NO;
    }
    
    BOOL isReachable = flags & kSCNetworkFlagsReachable;
    BOOL needsConnection = flags & kSCNetworkFlagsConnectionRequired;
    // = flags & kSCNetworkReachabilityFlagsIsWWAN;
    BOOL nonWifi = flags & kSCNetworkReachabilityFlagsTransientConnection;
    BOOL moveNet = flags & kSCNetworkReachabilityFlagsIsWWAN;
    
    return ((isReachable && !needsConnection) || nonWifi || moveNet) ? YES : NO;
}

- (NSString*)getDeviceUUID
{
    NSString *adId = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
    return adId;
}

- (void)showInAppWeb:(NSString*)url
{
    InAppWebView *web = [[InAppWebView alloc] initWithURL:url];
    [web showInView:[self viewController].view];
}

- (void)showAlertDialog:(NSString*)titile withContent:(NSString*)content positiveName:(NSString*)positive negativeName:(NSString*)negative listener:(AlertCompleteBlock)listener
{
    [self setAlertCompleteBlock:listener];
    
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:titile message:content preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *negativeAction = [UIAlertAction actionWithTitle:negative style:UIAlertActionStyleCancel handler:^(UIAlertAction* action){
        self.alertCompleteBlock(0);
    }];
    UIAlertAction *positiveAction = [UIAlertAction actionWithTitle:positive style:UIAlertActionStyleDefault handler:^(UIAlertAction* action){
        self.alertCompleteBlock(1);
    }];
    [alertController addAction:negativeAction];
    [alertController addAction:positiveAction];
    [self.viewController presentViewController:alertController animated:YES completion:nil];
    
}

- (void)systemShareWithTitile:(NSString*)title content:(NSString*)content imageUrl:(NSString*)imgUrl;
{
    NSMutableArray *arr = [[NSMutableArray alloc] init];
    if(![title isEqualToString:@""]){
        [arr addObject:title];
    }
    if(![content isEqualToString:@""]){
        [arr addObject:content];
    }
    if(![imgUrl isEqualToString:@""]){
        UIImage *img = [[UIImage alloc] initWithContentsOfFile:imgUrl];
        [arr addObject:img];
    }
    
    UIViewController *controller = [self viewController];
    UIActivityViewController *activityViewController = [[UIActivityViewController alloc] initWithActivityItems:arr applicationActivities:nil];
    //    activityViewController.excludedActivityTypes = @[UIActivityTypeAirDrop,UIActivityTypePrint, UI25ActivityTypeCopyToPasteboard, UIActivityTypeSaveToCameraRoll,UIActivityTypeAssignToContact];
    
    if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
        [controller presentViewController:activityViewController animated:YES completion:nil];
    } else {
        float x = [UIScreen mainScreen].bounds.size.width / 2;
        float y = [UIScreen mainScreen].bounds.size.height / 2;
        if (![self.activityPopover isPopoverVisible]) {
            self.activityPopover = [[UIPopoverController alloc] initWithContentViewController:activityViewController];
            [self.activityPopover presentPopoverFromRect:CGRectMake(x, y,0, 0) inView:((UIViewController *)controller).view permittedArrowDirections:UIPopoverArrowDirectionAny animated:YES];
        } else {
            [self.activityPopover dismissPopoverAnimated:YES];
        }
    }
}

- (void)makeToast:(NSString*)msg withTime:(long)millis
{
    float paddingX = 10.0f;
    float x = [UIScreen mainScreen].bounds.size.width / 2;
    float y = [UIScreen mainScreen].bounds.size.height - 100;
    float fontSize = 12.0f;
    float height = 25.0f;
    
    UIView *bg = [[UIView alloc] initWithFrame:CGRectMake(x, y, 0, 0)];
    bg.frame = CGRectMake(0, 0, 300, 200);
    bg.alpha = 0;
    bg.backgroundColor = [UIColor colorWithRed:0 green:0.0 blue:0.0 alpha:0.5];
    //设置圆角边框
    bg.layer.cornerRadius = 6;
    bg.layer.masksToBounds = YES;
    //设置边框及边框颜色
    [[self viewController].view addSubview:bg];
    
    UILabel* label = [[UILabel alloc] initWithFrame:CGRectMake(bg.frame.size.width / 2, bg.frame.size.height / 2, 0, height)];
    label.font = [UIFont systemFontOfSize:fontSize];  //UILabel的字体大小
    label.numberOfLines = 0;  //必须定义这个属性，否则UILabel不会换行
    label.textAlignment = NSTextAlignmentCenter;
    label.textColor = [UIColor whiteColor];
    
    CGRect rect = [msg boundingRectWithSize:CGSizeMake(MAXFLOAT, label.frame.size.height)
                                    options:NSStringDrawingUsesLineFragmentOrigin|NSStringDrawingUsesFontLeading
                                 attributes:@{NSFontAttributeName:[UIFont systemFontOfSize:fontSize]}
                                    context:nil];
    float width = (rect.size.width) + paddingX * 2;
    bg.frame = CGRectMake(x - width / 2, y, width, height);
    //根据计算结果重新设置UILabel的尺寸
    [label setFrame:CGRectMake(0, 0, bg.frame.size.width, bg.frame.size.height)];
    label.text = msg;
    
    [bg addSubview:label];
    
    [label release];
    [bg release];
    
    
    //弹出label
    [UIView animateWithDuration:0.5 animations:^{
        bg.alpha = 1.0;
    } completion:^ (BOOL finished){
        [NSTimer scheduledTimerWithTimeInterval:millis / 1000.0 repeats:NO block:^(NSTimer * _Nonnull timer) {
            //    label消失
            [UIView animateWithDuration:0.5 animations:^{
                bg.alpha = 0;
            } completion:^(BOOL finished){
                [bg removeFromSuperview];
            }];
        }];
    }];
}

+ (CGFloat)getHeightByWidth:(CGFloat)width title:(NSString *)title font:(UIFont *)font
{
    
    UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, width, 0)];
    label.text = title;
    label.font = font;
    label.numberOfLines = 0;
    [label sizeToFit];
    CGFloat height = label.frame.size.height;
    return height;
}

+ (CGFloat)getWidthWithTitle:(NSString *)title font:(UIFont *)font {
    UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 1000, 0)];
    label.text = title;
    label.font = font;
    [label sizeToFit];
    return label.frame.size.width;
}

@end
