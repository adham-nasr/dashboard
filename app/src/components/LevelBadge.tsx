import Tag from "./Tag";

import { LEVELS } from "../utils/types";
import { C } from "../utils/constants";

function LevelBadge ({ level } : {level: LEVELS})  {

  const map = {
    [LEVELS.INFO]:  { bg: C.infoBg,    color: C.info },
    [LEVELS.WARN]:  { bg: C.warnBg,    color: C.warn },
    [LEVELS.ERROR]: { bg: C.dangerBg,  color: C.danger },
  };
  const s = map[level] || map[LEVELS.INFO];
  return <Tag label={level} style={{ background: s.bg, color: s.color, border: "none" }} />;
};

export default LevelBadge