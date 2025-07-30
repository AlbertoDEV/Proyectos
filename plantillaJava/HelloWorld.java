import java.util.Scanner;

/**
 * HelloWorld.java
 * Un juego de "Elige tu propia aventura" ambientado en el año 3433.
 * El jugador toma decisiones que conducen a diferentes resultados en la historia.
 */
public class HelloWorld {

    public static void main(String[] args) {
        // Crea un objeto Scanner para leer la entrada del usuario desde la consola
        Scanner scanner = new Scanner(System.in);
        // Variable para controlar si el juego debe jugarse de nuevo
        boolean playAgain;

        // Bucle principal del juego, permite al usuario reiniciar el juego
        do {
            playAgain = false; // Reinicia la bandera playAgain para un nuevo juego

            // Muestra la introducción con arte ASCII
            System.out.println(" _  _             _  _");
            System.out.println(" .       /\\/%\       .   /%\/%\     .");
            System.out.println(" __.<\\\\%#//\\,_       <%%#/%%\\,__  .");
            System.out.println(".    <%#/|\\\\%%%#///\\    /^%#%%\\///%#\\\\");
            System.out.println(" \"\"/%/\"\"\\ \\\"\"//|   |/\"\"'/ /\\//\"\"//'");
            System.out.println(" .     L/'`   \\ \\  `    \"   / /  ```");
            System.out.println(" `      \\ \\     .   / /       .");
            System.out.println(" .       .      \\ \\       / /  .");
            System.out.println(" .        \\ \\     / /          .");
            System.out.println(" .      .    ..:\\ \\:::/ /:.     .     .");
            System.out.println("______________/ \\__;\\___/\\;_/\\________________________________");
            System.out.println("YwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYwYw");

            // Introducción a la historia, retomando el escenario proporcionado por el usuario
            System.out.println("\nHas sido transportado al año 3433. Te despiertas y te das cuenta de que ya no estás en la Tierra. La gravedad se siente diferente. Está oscuro afuera y, al levantarte, te das cuenta de que estás afuera... ¿una casa?");
            System.out.println("Recuerdas haber elegido caminar hacia la casa en tu último recuerdo.");
            System.out.println("Te acercas a la casa y subes las escaleras hasta la puerta principal. Estás a punto de llamar cuando de repente notas que las luces dentro de la casa se encienden.");

            // Primer punto de decisión importante
            System.out.println("\nLa puerta se abre ligeramente, revelando un pasillo tenuemente iluminado. Un extraño olor metálico llena el aire. ¿Qué haces? [a] Entrar en la casa, [b] intentar encontrar otra forma de rodearla, o [c] huir?");
            String choice1 = scanner.nextLine(); // Lee la elección del usuario

            // --- Ramificación de la historia basada en choice1 ---
            if (choice1.equalsIgnoreCase("a")) {
                // Ruta 1: El jugador elige entrar en la casa
                System.out.println("\nEntras y la puerta se cierra de golpe detrás de ti. El pasillo es largo y silencioso. Ves dos caminos: una luz azul brillante a tu izquierda y un pasillo oscuro y estrecho a tu derecha. ¿Qué camino tomas? [a] Izquierda o [b] Derecha?");
                String choice2 = scanner.nextLine(); // Lee la segunda elección del usuario

                if (choice2.equalsIgnoreCase("a")) {
                    // Final 1: El final "Vivir"
                    System.out.println("\nSigues la luz azul, que te lleva a una sala de control. Un amigable alienígena te saluda y te explica que has sido traído aquí para un programa de intercambio galáctico. ¡La computadora dice que sigues vivo!");
                } else if (choice2.equalsIgnoreCase("b")) {
                    // Final 2: El final de muerte "Caída por el acantilado"
                    System.out.println("\nTe aventuras en el pasillo oscuro. El suelo se vuelve irregular y, de repente, pierdes el equilibrio. Caes en un profundo abismo. Te caíste por el acantilado y te precipitaste a la muerte. Lo siento...");
                } else {
                    // Elección inválida para la segunda decisión en esta ruta
                    System.out.println("\nElección inválida. La historia termina abruptamente mientras te quedas paralizado por la indecisión. Eres consumido por la oscuridad.");
                }
            } else if (choice1.equalsIgnoreCase("b")) {
                // Ruta 2: El jugador elige encontrar otra forma de rodear la casa
                System.out.println("\nDecides no entrar y rodeas la casa. Descubres un jardín lleno de plantas inusuales y brillantes. Algunas tienen bayas brillantes y tentadoras. ¿Qué haces? [a] Comer las bayas o [b] ignorarlas?");
                String choice2 = scanner.nextLine(); // Lee la segunda elección del usuario

                if (choice2.equalsIgnoreCase("a")) {
                    // Final 3: El final de supervivencia "Comiste algunas bayas"
                    System.out.println("\nCon cautela comes algunas de las bayas brillantes. Sorprendentemente, saben deliciosas y sientes una oleada de energía. Comiste algunas bayas y no moriste. ¿Eres tú, Peeta?");
                } else if (choice2.equalsIgnoreCase("b")) {
                    // Una variación de un final malo: Perdido en la naturaleza alienígena
                    System.out.println("\nIgnoras las bayas y continúas explorando el extraño jardín. Las plantas brillantes parecen cerrarse a tu alrededor y te das cuenta de que estás irremediablemente perdido en la naturaleza alienígena. Vagas indefinidamente, sin encontrar nunca el camino de regreso. Este no es el final que esperabas.");
                } else {
                    // Elección inválida para la segunda decisión en esta ruta
                    System.out.println("\nElección inválida. La historia termina abruptamente mientras te quedas paralizado por la indecisión. Eres consumido por la extraña flora.");
                }
            } else if (choice1.equalsIgnoreCase("c")) {
                // Ruta 3: El jugador elige huir
                // Otra variación de un final malo: Perdido y sucumbiendo al entorno
                System.out.println("\nEntras en pánico y corres de regreso a la oscuridad. Tropiezas por el terreno desconocido, perdiendo finalmente de vista la casa. Vagas sin rumbo bajo el cielo alienígena, sucumbiendo finalmente al duro entorno. Este no es el final que esperabas.");
            } else {
                // Elección inválida para la primera decisión
                System.out.println("\nElección inválida. La historia termina abruptamente mientras te quedas paralizado por la indecisión. La casa se desvanece lentamente en la oscuridad.");
            }

            // Pregunta para jugar de nuevo
            System.out.println("\n---");
            System.out.print("Pulsa [s] para jugar de nuevo: ");
            String restartChoice = scanner.nextLine();
            if (restartChoice.equalsIgnoreCase("s")) {
                playAgain = true; // Establece en true para repetir el bucle do-while
            }

        } while (playAgain); // Continúa el bucle si playAgain es true

        // Mensaje de despedida cuando el juego termina
        System.out.println("¡Gracias por jugar!");
        scanner.close(); // Cierra el scanner para liberar los recursos del sistema
    }
}
