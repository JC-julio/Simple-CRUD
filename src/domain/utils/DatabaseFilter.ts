
class DatabaseFilter{
  constructor(props: any){
    for (let key of Object.keys(props)){
      if (props[key] === '*' || props[key] == 'null') continue
      else if (props[key] === 'true') this[key] = true
      else if (props[key] === 'false') this[key] = false
      else if (this.isList(props[key])) {
        this[key] = this.convertStringToList(props[key])
      }
      else this[key] = props[key];
    }
    
  }
  private isList(str:string){
    return str.includes(',');
  }
  private convertStringToList(str:string){
    return str.split(',');
  }
}
export default DatabaseFilter as any
