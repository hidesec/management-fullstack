import { helper } from '@ember/component/helper';

export function inc([value]) {
  return value + 1;
}

export default helper(inc);
