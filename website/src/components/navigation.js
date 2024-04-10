import "./navigation.css";

export default function Navigation({ appCtx }) {
  return (
    <div
      className={
        "navigation" + (appCtx.hideNavigation ? " navigation-hide" : "")
      }
    >
      <div>Home</div>
      <div>Languages</div>
      <div>Profile</div>
      <div>Log Out</div>
    </div>
  );
}
