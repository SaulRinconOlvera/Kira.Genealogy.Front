// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  drawingConfiguration: {
    containerName: 'container',
    imagesPath: './assets/images/',
    scaleZoom: {
      useZoom: true,
      maxScaleZoom: 2.5,
      minScaleZoom: 0.2,
      zoomScaleby: 1.2
    },
    cardInformation: {
      size: {
        width: 250,
        height: 100
      },
      shadow: {
        showShadow: true,
        shadowBlur: 5,
        shadowOpacity: .5,
        shadowOffset: { x: 2, y: 2 },
      },
      stroke: {
        showStroke: true,
        strokeColor: '#2B6787',
        strokeWidth: .5
      },
      fill: {
        fillCard: true,
        fillColor: {
          maleColor: '#88D5FF',
          femaleColor: '#FFBCFE'
        }
      },
      cornerRadius: 10,
      events: {
        onMouseOver: {
          cursorStyle: 'pointer',
          attrs: {
            strokeWidth: 1,
            changeFillColor: true,
            fillColor: {
              maleColor: '#88D5FF',
              femaleColor: 'rgba(245,173,216,0.96)'
            }
          }
        },
        onMouseOut: {
          cursorStyle: 'default',
          attrs: {
            strokeWidth: .5,
            changeFillColor: true,
            fillColor: {
              maleColor: '#88D5FF',
              femaleColor: '#FFBCFE'
            }
          }
        }
      },
      textFonts: {
        nameText: {
          fontFamily: 'Roboto',
          fontSize: 16,
          fontStyle: 'normal',
          fill: '#18394D',
        },
        middleNameText: {
          fontFamily: 'Roboto Condensed',
          fontSize: 16,
          fontStyle: 'bold',
          fill: '#18394D',
        },
        bornDateIcon: {
          text: '\uf004',
          fontFamily: 'FontAwesome',
          fontSize: 8,
          fontStyle: 'normal',
          fill: '#18394D',
        },
        dateText: {
          fontFamily: 'Roboto Condensed',
          fontSize: 12,
          fontStyle: 'normal',
          fill: '#18394D',
        }
      },
      photo: {
        position: {
          x: 10,
          y: 10
        },
        size: {
          width: 60,
          height: 80
        },
        stroke: {
          show: true,
          width: 1,
          color: '#18394D'
        },
        cornerRadius: 5,
        fillPatternScale: {
          x: .5,
          y: .5,
        },
      }
    },
    cardsOrientation: {
      minXSpace: 50,
      minYSpace: 50,
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
