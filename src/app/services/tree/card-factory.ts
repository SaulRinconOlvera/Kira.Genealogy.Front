import { Person } from 'src/app/model/draw/person';
import Konva from 'konva';
import { environment } from 'src/environments/environment';
import { RectConfig } from 'konva/types/shapes/Rect';
import { genderEnum } from 'src/app/model/draw/enumerators/gender-enum';
import * as moment from 'moment';

export class CardFactory {

    private static person : Person;

    public static drawCard = (person : Person) : Konva.Group => {
        CardFactory.person = person;
        moment.locale('es');
        return CardFactory.createGroup();
    }

    private static createGroup = () : Konva.Group => {
        const group : Konva.Group = new Konva.Group();
        group.add(CardFactory.addPrincipalRec());
        group.add(CardFactory.addMiddleNameText());
        group.add(CardFactory.addNameText());
        group.add(CardFactory.addDateIconText());
        group.add(CardFactory.addDateText());
        group.add(CardFactory.divitionLine());

        CardFactory.addPhotoRec().then((p) => group.add(p));

        return group;
    }

    private static addPhotoRec = async () : Promise<Konva.Rect> => {
        let image = new Image();

        await CardFactory.getImage().then((i) => image = i );

        return new Konva.Rect({
            x: environment.drawingConfiguration.cardInformation.photo.position.x,
            y: environment.drawingConfiguration.cardInformation.photo.position.y,
            width: environment.drawingConfiguration.cardInformation.photo.size.width,
            height: environment.drawingConfiguration.cardInformation.photo.size.height,
            fillPatternImage: image,
            fillPatternScale: ({
                x: environment.drawingConfiguration.cardInformation.photo.fillPatternScale.x,
                y: environment.drawingConfiguration.cardInformation.photo.fillPatternScale.y }),
            cornerRadius: environment.drawingConfiguration.cardInformation.photo.cornerRadius,
            stroke: environment.drawingConfiguration.cardInformation.photo.stroke.color,
            strokeWidth: environment.drawingConfiguration.cardInformation.photo.stroke.width
        });
    }

    private  static  getImage = async () : Promise<HTMLImageElement> => {
        return new Promise( ( resolve, reject) => {
            const image = new Image();
            let photo : string;

            if (CardFactory.person.hasPhoto)
                photo = CardFactory.person.personalImage;
            else
                photo = CardFactory.person.gender === genderEnum.Male ? 'user-male.png' : 'user-female.png';

            image.src = `${environment.drawingConfiguration.imagesPath}/${photo}`;
            image.onload = () => {
                resolve(image);
                reject(null);
            };
        });
    }

    private static addPrincipalRec = () : Konva.Rect => {

        let config : Konva.RectConfig = {
            width: environment.drawingConfiguration.cardInformation.size.width,
            height: environment.drawingConfiguration.cardInformation.size.height,
            cornerRadius: environment.drawingConfiguration.cardInformation.cornerRadius
        };

        config = CardFactory.AddStroke(config);
        config = CardFactory.AddFill(config);
        config = CardFactory.AddShadow(config);

        return new Konva.Rect(config);
    }

    private static divitionLine = () : Konva.Line => {
        return new Konva.Line({
            points: [80, 45, environment.drawingConfiguration.cardInformation.size.width - 10, 45],
            stroke: environment.drawingConfiguration.cardInformation.stroke.strokeColor,
            strokeWidth: environment.drawingConfiguration.cardInformation.stroke.strokeWidth,
            lineJoin: 'round',
          });
    }

    private static addMiddleNameText = () : Konva.Text => {
        return new Konva.Text({
            x: 80,
            y: 10,
            text: `${CardFactory.person.firstFamilyName} ${CardFactory.person.secondFamilyName}`  ,
            fontSize: environment.drawingConfiguration.cardInformation.textFonts.middleNameText.fontSize,
            fontStyle: environment.drawingConfiguration.cardInformation.textFonts.middleNameText.fontStyle,
            fontFamily: environment.drawingConfiguration.cardInformation.textFonts.middleNameText.fontFamily,
            fill: environment.drawingConfiguration.cardInformation.textFonts.middleNameText.fill,
          });
    }

    private static addNameText = () : Konva.Text => {
        return new Konva.Text({
            x: 80,
            y: 28,
            text: CardFactory.person.name,
            fontSize: environment.drawingConfiguration.cardInformation.textFonts.nameText.fontSize,
            fontStyle: environment.drawingConfiguration.cardInformation.textFonts.nameText.fontStyle,
            fontFamily: environment.drawingConfiguration.cardInformation.textFonts.nameText.fontFamily,
            fill: environment.drawingConfiguration.cardInformation.textFonts.nameText.fill,
          });
    }

    private static addDateIconText = () : Konva.Text => {
        return new Konva.Text({
            x: 80,
            y: 50,
            text: environment.drawingConfiguration.cardInformation.textFonts.bornDateIcon.text,
            fontSize: environment.drawingConfiguration.cardInformation.textFonts.bornDateIcon.fontSize,
            fontStyle: environment.drawingConfiguration.cardInformation.textFonts.bornDateIcon.fontStyle,
            fontFamily: environment.drawingConfiguration.cardInformation.textFonts.bornDateIcon.fontFamily,
            fill: environment.drawingConfiguration.cardInformation.textFonts.bornDateIcon.fill,
          });
    }

    private static addDateText = () : Konva.Text => {
        return new Konva.Text({
            x: 95,
            y: 50,
            text: moment(CardFactory.person.bornDate).format('LL'),
            fontSize: environment.drawingConfiguration.cardInformation.textFonts.dateText.fontSize,
            fontStyle: environment.drawingConfiguration.cardInformation.textFonts.dateText.fontStyle,
            fontFamily: environment.drawingConfiguration.cardInformation.textFonts.dateText.fontFamily,
            fill: environment.drawingConfiguration.cardInformation.textFonts.dateText.fill,
          });
    }

    private static AddStroke(config : RectConfig) : Konva.RectConfig {
        if (environment.drawingConfiguration.cardInformation.stroke.showStroke) {
            config.stroke = environment.drawingConfiguration.cardInformation.stroke.strokeColor;
            config.strokeWidth = environment.drawingConfiguration.cardInformation.stroke.strokeWidth;
        }

        return config;
    }

    private static AddFill(config : RectConfig) : Konva.RectConfig {
        if (environment.drawingConfiguration.cardInformation.fill.fillCard) {
            config.fill = CardFactory.person.gender === genderEnum.Male ?
                          environment.drawingConfiguration.cardInformation.fill.fillColor.maleColor :
                          config.fill = environment.drawingConfiguration.cardInformation.fill.fillColor.femaleColor;
        }

        return config;
    }

    private static AddShadow(config : RectConfig) : Konva.RectConfig {
        if (environment.drawingConfiguration.cardInformation.shadow.showShadow) {
            config.shadowBlur = environment.drawingConfiguration.cardInformation.shadow.shadowBlur;
            config.shadowOpacity = environment.drawingConfiguration.cardInformation.shadow.shadowOpacity;
            config.shadowOffset = environment.drawingConfiguration.cardInformation.shadow.shadowOffset;
        }

        return config;
    }
}
