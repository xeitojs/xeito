
/**
 * Interface for the value of the parameter
 * Received by a method decorated with @Watch
 * eg:
 * @Watch('$count', '$name')
 * watchCount(update: WatchUpdate) {
 *  // update.name = '$count' or '$name'	
 *  // update.value = the new value of the state for the given property name
 * }
 */
export interface WatchUpdate {
  [name: string]: any;
  value: any;
}
