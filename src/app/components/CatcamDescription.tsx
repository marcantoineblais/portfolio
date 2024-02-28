import CellphoneDisplay from "./CellphoneDisplay";
import TextBubble from "./TextBubble";

export default function CatcamDescription() {
  return (
    <div className="h-full p-3 flex flex-col justify-between gap-3">
      <TextBubble className="bg-gray-200 shadow-md">
        <p className="text-justify">La Catcam est une application web conçue spécifiquement pour regarder nos animaux lorsque nous quittons notre foyer.</p>            
      </TextBubble>

      <TextBubble className="bg-gray-200 shadow-md">
        <p className="text-justify">
          Il est possible d'utiliser une fonctionnalité de détections de mouvements pour enregistrer les méfaits de nos félins favoris et de les prendre la main dans le sac!
        </p> 
      </TextBubble>

      <TextBubble className="bg-gray-200 shadow-md">
        <p className="text-justify">Avec la Catcam, votre vie privée est protégée puisque l'application utilise un serveur local dans votre résidence.</p>       
      </TextBubble>

      <TextBubble className="bg-gray-200 shadow-md">
        <p className="text-justify">
          Vous pouvez manipuler l'interface ici afin de tester les contrôles de l'application et regarder son design.
          Pour consulter les autres pages, utilisez les flèches de gauche et de droite.
        </p>
      </TextBubble>
    </div>
  )
}