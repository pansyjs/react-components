import { genRandomId } from './utils';
import { Observers, WatermarkDOM } from './interface';
import { getMutationObserver } from './utils';

interface SecurityHooks {
  securityAlarm: () => void;
  updateObserver: (observers: Observers) => void;
}

interface SecurityDefenseStyle {
  waterMarkStyle: string;
  getCanvasUrl: () => string;
}

class SecurityDefense {
  private watermarkId: string;
  private watermarkWrapperId: string;
  private waterMarkStyle: string;

  private getImageUrl: SecurityDefenseStyle['getCanvasUrl'];
  private securityAlarm: SecurityHooks['securityAlarm'];
  private updateObserver: SecurityHooks['updateObserver'];

  constructor(watermarkDOM: WatermarkDOM, style: SecurityDefenseStyle, securityHooks) {
    this.watermarkId = watermarkDOM.watermarkId
    this.watermarkWrapperId = watermarkDOM.watermarkWrapperId

    this.waterMarkStyle = style.waterMarkStyle
    this.getImageUrl = style.getCanvasUrl

    this.securityAlarm = securityHooks.securityAlarm
    this.updateObserver = securityHooks.updateObserver

    const wrapper = this.getDOM(this.watermarkWrapperId)
    const watermark = this.getDOM(this.watermarkId)
    this.registerNodeRemoveListener(wrapper)
    this.registerNodeAttrChangeListener(watermark)
  }

  getDOM = (id: string) => {
    return document.getElementById(id)
  }

  registerNodeRemoveListener = (target) => {
    const MutationObserver = getMutationObserver();
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const removeNodes = mutation.removedNodes
          if (removeNodes && removeNodes[0] && removeNodes[0].id) {
            const id = removeNodes[0].id
            if (id && id.indexOf(this.watermarkId) > -1) {
              if (this.securityAlarm) {
                this.securityAlarm()
              }
              this.createWaterMarkDom(target)
            }
          }
        }
      })
    })
    let config = { childList: true }


    observer.observe(target, config)
    this.updateObserver({ DOMRemoveObserver: observer })
  }

  createWaterMarkDom = (parent) => {
    const newWaterMark: HTMLDivElement = document.createElement('div')
    this.watermarkId = genRandomId('water-mark-dynamic')
    newWaterMark.id = this.watermarkId
    this.waterMarkStyle = this.waterMarkStyle.concat(`background-image: url("${this.getImageUrl()}");`)
    // @ts-ignore
    newWaterMark.style = this.waterMarkStyle
    parent.appendChild(newWaterMark)
    const newDOM = this.getDOM(this.watermarkId)
    this.registerNodeAttrChangeListener(newDOM)
  }

  registerNodeAttrChangeListener = (target) => {
    const MutationObserver = getMutationObserver();

    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          target.parentNode.removeChild(target)
          observer.disconnect()
        }
      })
    })
    let config = { attributes: true, attributeFilter: ['style'] }
    observer.observe(target, config)
    this.updateObserver({ DOMAttrModifiedObserver: observer })
  }
}

export default SecurityDefense;
