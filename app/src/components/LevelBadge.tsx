import { C } from "../utils/constants";
import Tag from "./Tag";

function LevelBadge ({ level="" })  {
  const map = {
    INFO:  { bg: C.infoBg,    color: C.info },
    WARN:  { bg: C.warnBg,    color: C.warn },
    ERROR: { bg: C.dangerBg,  color: C.danger },
  };
  const s = map[level] || map.INFO;
  return <Tag label={level} style={{ background: s.bg, color: s.color, border: "none" }} />;
};

export default LevelBadge