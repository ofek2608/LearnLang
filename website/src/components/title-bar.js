import "./title-bar.css";

export default function TitleBar({ appCtx }) {
  return (
    <div
      className={"title-bar" + (appCtx.hideTitleBar ? " title-bar-hide" : "")}
    >
      <div>
        <div
          className={appCtx.hideNavigation ? "hamburger" : "close"}
          onClick={() => {
            appCtx.setHideNavigation(!appCtx.hideNavigation);
          }}
        />
        <div />
        <div />
      </div>
    </div>
  );
}
