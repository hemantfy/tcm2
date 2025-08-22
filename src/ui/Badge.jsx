export default function Badge({ tone="default", children }) {
    const map = {
      default:"badge badge--default",
      info:"badge badge--info",
      warn:"badge badge--warn",
      danger:"badge badge--danger",
      success:"badge badge--success",
    };
    return <span className={map[tone] || map.default}>{children}</span>;
  }
  