//
//  InAppWebView.m
//  PPLibrary
//
//  Created by tangbowen on 16/8/18.
//
//

#import "InAppWebView.h"
#import <JavaScriptCore/JavaScriptCore.h>

@interface InAppWebView(Private)
@end

@implementation InAppWebView


- (instancetype)initWithURL:(NSString*)url
{
    CGRect rect = [self getCurrentFrame];
    if (self = [super initWithFrame:rect]) {
        [self initWebView:[NSURL URLWithString:url]];
        return self;
    }
    return nil;
}

-(void)dealloc
{
    [_indicator release];
    [_webView release];
    [super dealloc];
}

- (void)showInView:(UIView *)theView {
    self.layer.zPosition=200;
    // 添加一个通知
    [[NSNotificationCenter defaultCenter] postNotificationName:kPrivacyWillShownedNotification object:self];
    
    CGRect rect = [self getCurrentFrame];
    
    rect = [[UIScreen mainScreen] bounds];
    if (UIInterfaceOrientationIsLandscape([[UIApplication sharedApplication] statusBarOrientation])) {
        CGFloat width = MAX(CGRectGetHeight(rect), CGRectGetWidth(rect));
        CGFloat height = MIN(CGRectGetHeight(rect), CGRectGetWidth(rect));
        rect = CGRectMake(0, 0, width, height);
    }
    
    CGFloat dt = 0;
    if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0) {
        dt = [self getStatusBarHeight];
    }
    
    CGRect frame = self.frame;
    frame.origin.y = CGRectGetHeight(rect);
    self.frame = frame;
    
    [theView addSubview:self];
    [UIView beginAnimations:@"show" context:nil];
    [UIView setAnimationDelegate:self];
    [UIView setAnimationDuration:.3];
    frame.origin.y = CGRectGetHeight(rect) - CGRectGetHeight(self.bounds);
    self.frame = frame;
    [UIView commitAnimations];
}

- (void)dismiss {
    // 添加一个通知
    [[NSNotificationCenter defaultCenter] postNotificationName:kPrivacyWillDismissNotification object:self];
    [UIView beginAnimations:@"dismiss" context:nil];
    [UIView setAnimationDelegate:self];
    [UIView setAnimationDuration:.3];
    [self setCenter:CGPointMake(self.bounds.size.width/2, self.bounds.size.height/2*3)];
    [UIView commitAnimations];
}

#pragma mark - Animation delegate methods
- (void)animationDidStop:(NSString *)animationID finished:(NSNumber *)finished context:(void *)context {
    if ([animationID isEqualToString:@"show"]) {
        UIButton* close_btn = (UIButton*)[self viewWithTag:TAG_CLOSE];
        [close_btn setUserInteractionEnabled:YES];
    }
    if ([animationID isEqualToString:@"dismiss"]) {
        [self removeFromSuperview];
    }
}

-(void)initWebView:(NSURL*)url
{
    self.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    
    _screenWidth = MIN([UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height);
    _screenHeight = MAX([UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height);
    
    if([UIApplication sharedApplication].statusBarOrientation > UIInterfaceOrientationPortraitUpsideDown){
        _screenWidth = MAX([UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height);
        _screenHeight = MIN([UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height);
    }
    
    // 添加毛玻璃背景效果
    UIBlurEffect *blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
    UIVisualEffectView *effectView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];
    effectView.frame = CGRectMake(0, 0, _screenWidth, _screenHeight);
    [self addSubview:effectView];
    [effectView release];
    WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
    // 设置偏好设置
    config.preferences = [[WKPreferences alloc] init];
    // 默认为0
    config.preferences.minimumFontSize = 10;
    // 默认认为YES
    config.preferences.javaScriptEnabled = YES;
    // 在iOS上默认为NO，表示不能自动通过窗口打开
    config.preferences.javaScriptCanOpenWindowsAutomatically = NO;
    // web内容处理池，由于没有属性可以设置，也没有方法可以调用，不用手动创建
    config.processPool = [[WKProcessPool alloc] init];
    // 通过JS与webview内容交互
    config.userContentController = [[WKUserContentController alloc] init];
    // 注入JS对象名称AppModel，当JS通过AppModel来调用时，
    // 我们可以在WKScriptMessageHandler代理中接收到
//    [config.userContentController addScriptMessageHandler:self name:@"AppModel"];
    
    // 网页
    _webView = [[WKWebView alloc] initWithFrame:CGRectMake(0, 0, _screenWidth, _screenHeight) configuration:config];
    _webView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    _webView.backgroundColor =  UIColor(180, 186, 208, 100);
    _webView.alpha = 0;
    _webView.navigationDelegate = self;
    [self addSubview: _webView];
    
    // 控制条
    UIView *controlBar = [[UIView alloc] initWithFrame:CGRectMake(0, _screenHeight - BAR_HEIGHT, _screenWidth, BAR_HEIGHT)];
    controlBar.autoresizingMask = UIViewAutoresizingFlexibleWidth;
    [controlBar setBackgroundColor:UIColor(61, 66, 83, 220)];
    [self addSubview:controlBar];
    
    // 初始化TitleView
    UIImage *titleImg = [UIImage imageWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"logo" ofType:@"png"]];
    UIImageView *titleView = [[UIImageView alloc] initWithImage:titleImg];
    titleView.center = CGPointMake(_screenWidth / 2, BAR_HEIGHT / 2);
    titleView.autoresizingMask = UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin;
    [controlBar addSubview:titleView];
    
    // 初始化Button
    UIButton *closeBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [closeBtn setTitle:@"×" forState:UIControlStateNormal];
    [closeBtn setTitleColor:UIColor(255, 255, 255, 255) forState:UIControlStateNormal];
    [closeBtn setUserInteractionEnabled:YES];
    [closeBtn setTag:TAG_CLOSE];
    [closeBtn setExclusiveTouch:YES];
    [closeBtn sizeToFit];
    [closeBtn addTarget:self action:@selector(dismiss) forControlEvents:UIControlEventTouchUpInside];
    [closeBtn setFrame:CGRectMake(controlBar.frame.size.width - BAR_HEIGHT, 0, BAR_HEIGHT, BAR_HEIGHT)];
    [closeBtn setAutoresizingMask:UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin];
    [controlBar addSubview:closeBtn];
    
    [titleView release];
    [controlBar release];
    
    //  init indicator
    _indicator = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
    _indicator.autoresizingMask =
    UIViewAutoresizingFlexibleTopMargin |
    UIViewAutoresizingFlexibleLeftMargin |
    UIViewAutoresizingFlexibleBottomMargin |
    UIViewAutoresizingFlexibleRightMargin;
    _indicator.hidesWhenStopped = YES;
    _indicator.center = CGPointMake(self.bounds.size.width/2, self.bounds.size.height/2);
    [self addSubview:_indicator];
    
    [self loadContentsFromURL:url];
}

-(void)loadContentsFromURL:(NSURL*)url
{
    [_indicator startAnimating];
    // NSURLRequestReturnCacheDataElseLoad 先从缓存中拿
    // NSURLRequestReloadIgnoringLocalCacheData
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:url cachePolicy:NSURLRequestReloadIgnoringLocalCacheData timeoutInterval:5];
    [_webView loadRequest:request];
    [request release];
}


-(void)injectJSFunction
{
//    [_webView stringByEvaluatingJavaScriptFromString:@""];
}

//- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType{
//    
//    if (navigationType == UIWebViewNavigationTypeLinkClicked) {
//        [[UIApplication sharedApplication] openURL:[request URL]];
//        return NO;
//    }
//    return YES;
//}

//- (void)webViewDidStartLoad:(UIWebView *)webView{}
//- (void)webViewDidFinishLoad:(UIWebView *)webView {
//    _webView.alpha = 1;
//    [_indicator stopAnimating];
//    JSContext *context=[webView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
//    
//    context[@"btnClose"] = ^() {
//        [self dismiss];
//    };
//    [[NSUserDefaults standardUserDefaults] setInteger:0 forKey:@"WebKitCacheModelPreferenceKey"];
//}

//- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error{
//    [_indicator stopAnimating];
//    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil message:[error localizedDescription] delegate:self cancelButtonTitle:nil otherButtonTitles:@"OK",nil];
//    [alert show];
//    [alert release];
//}

- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {
    if (navigationAction.navigationType == WKNavigationTypeLinkActivated) {
        // 对于跨域，需要手动跳转
        [[UIApplication sharedApplication] openURL:navigationAction.request.URL];
        
        // 不允许web内跳转
        decisionHandler(WKNavigationActionPolicyCancel);
    } else {
        decisionHandler(WKNavigationActionPolicyAllow);
    }
    
}

- (void)webView:(WKWebView *)webView didStartProvisionalNavigation:(null_unspecified WKNavigation *)navigation{}

- (void)webView:(WKWebView *)webView didFinishNavigation:(null_unspecified WKNavigation *)navigation
{
    _webView.alpha = 1;
    [_indicator stopAnimating];
//    JSContext *context=[webView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
//    
//    context[@"btnClose"] = ^() {
//        [self dismiss];
//    };
//    [[NSUserDefaults standardUserDefaults] setInteger:0 forKey:@"WebKitCacheModelPreferenceKey"];
}

- (void)webView:(WKWebView *)webView didFailNavigation:(null_unspecified WKNavigation *)navigation withError:(NSError *)error
{
    [_indicator stopAnimating];
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil message:[error localizedDescription] delegate:self cancelButtonTitle:nil otherButtonTitles:@"OK",nil];
    [alert show];
    [alert release];
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    if (buttonIndex == 0) {
        [self dismiss];
    }
}

#pragma mark -- util method
- (CGRect)getCurrentFrame
{
    CGRect rect = [UIScreen mainScreen].applicationFrame;
    UIInterfaceOrientation orit = [UIApplication sharedApplication].statusBarOrientation;
    if (UIInterfaceOrientationIsLandscape(orit)) {
        CGFloat width = MAX(rect.size.width, rect.size.height);
        CGFloat height = MIN(rect.size.width, rect.size.height);
        rect = CGRectMake(0, 0, width, height);
    }
    return rect;
}

- (CGFloat)getStatusBarHeight
{
    if (UIInterfaceOrientationIsLandscape([[UIApplication sharedApplication] statusBarOrientation])) {
        return [[UIApplication sharedApplication] statusBarFrame].size.width;
    }
    
    return [[UIApplication sharedApplication] statusBarFrame].size.height;
}

@end
