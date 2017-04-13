import { Injectable } from '@angular/core';

@Injectable()
export class Global {
  public user = {"email": "", "displayName": ""};
  public guest = {};
  public data = {"details": {"gEmail": "", "gName": "", "branch": "", "old_face":"0", "new_face":"0", "familyPic1":"0", "familyPic2":"0", "status":0, "file1": undefined, "file2": undefined, "file3": undefined, "file4": undefined}};
}