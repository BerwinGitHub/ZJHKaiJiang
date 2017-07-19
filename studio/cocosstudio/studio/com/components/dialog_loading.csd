<GameFile>
  <PropertyGroup Name="dialog_loading" Type="Node" ID="1ee370ee-62b8-4e32-8fa4-0ed4dcfe24a9" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="10" Speed="1.0000" ActivedAnimationName="loading">
        <Timeline ActionTag="1028214430" Property="Position">
          <PointFrame FrameIndex="0" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="2" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="5" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="10" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </PointFrame>
        </Timeline>
        <Timeline ActionTag="1028214430" Property="Scale">
          <ScaleFrame FrameIndex="0" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="5" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="10" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="1028214430" Property="RotationSkew">
          <ScaleFrame FrameIndex="0" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="5" X="180.0000" Y="180.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="10" X="360.0000" Y="360.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="1028214430" Property="FileData">
          <TextureFrame FrameIndex="2" Tween="False">
            <TextureFile Type="MarkedSubImage" Path="studio/com/images/ui/loading.png" Plist="studio/com/images/ui.plist" />
          </TextureFrame>
        </Timeline>
        <Timeline ActionTag="1028214430" Property="BlendFunc">
          <BlendFuncFrame FrameIndex="2" Tween="False" Src="1" Dst="771" />
        </Timeline>
      </Animation>
      <AnimationList>
        <AnimationInfo Name="loading" StartIndex="0" EndIndex="10">
          <RenderColor A="255" R="255" G="239" B="213" />
        </AnimationInfo>
      </AnimationList>
      <ObjectData Name="Node" Tag="517" ctype="GameNodeObjectData">
        <Size X="0.0000" Y="0.0000" />
        <Children>
          <AbstractNodeData Name="loading_1" ActionTag="1028214430" Tag="37" IconVisible="False" LeftMargin="-18.0000" RightMargin="-18.0000" TopMargin="-18.0000" BottomMargin="-18.0000" ctype="SpriteObjectData">
            <Size X="36.0000" Y="36.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="MarkedSubImage" Path="studio/com/images/ui/loading.png" Plist="studio/com/images/ui.plist" />
            <BlendFunc Src="1" Dst="771" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>