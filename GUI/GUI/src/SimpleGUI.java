import javax.swing.*;
import java.awt.*; // For using BorderLayout
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SimpleGUI {

    // GUI Components
    private JTextArea storyTextArea;
    private JTextField inputTextField;
    private JButton submitButton;
    private JLabel statusLabel; // For short messages or instructions

    // Game state variables
    private int gameStage = 0; // 0: Start, 1: First decision, 2: Second decision (path A), 3: Second decision (path B)
    private String choice1 = ""; // To store the user's first choice

    public SimpleGUI() {
        // Main window setup (JFrame)
        JFrame frame = new JFrame("Choose Your Own Adventure");
        frame.setSize(600, 450); // Larger size for the story
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new BorderLayout()); // Using BorderLayout for better organization

        // Text area for the story (JTextArea)
        storyTextArea = new JTextArea();
        storyTextArea.setEditable(false); // Do not allow the user to edit the story
        storyTextArea.setLineWrap(true); // Automatically wrap lines
        storyTextArea.setWrapStyleWord(true); // Wrap whole words
        storyTextArea.setFont(new Font("Monospaced", Font.PLAIN, 14)); // Font to look like console output
        JScrollPane scrollPane = new JScrollPane(storyTextArea); // Add scroll if text is too long
        frame.add(scrollPane, BorderLayout.CENTER); // Place the text area in the center

        // Bottom panel for user input and button
        JPanel inputPanel = new JPanel();
        inputPanel.setLayout(new BorderLayout());

        statusLabel = new JLabel("Introduce tu elección (a, b, c...):");
        statusLabel.setHorizontalAlignment(SwingConstants.CENTER); // Center the text
        inputPanel.add(statusLabel, BorderLayout.NORTH);

        inputTextField = new JTextField();
        inputTextField.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // If the user presses Enter in the text field, simulate a button click
                submitButton.doClick();
            }
        });
        inputPanel.add(inputTextField, BorderLayout.CENTER);

        submitButton = new JButton("Continuar");
        submitButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                processUserChoice(); // Call the method that processes the user's choice
            }
        });
        inputPanel.add(submitButton, BorderLayout.EAST); // Place the button on the right

        frame.add(inputPanel, BorderLayout.SOUTH); // Place the input panel at the bottom

        // Start the game
        startGame();

        // Make the window visible
        frame.setVisible(true);
    }

    // Method to start or restart the game
    private void startGame() {
        gameStage = 0; // Reset game stage
        choice1 = ""; // Reset choice
        inputTextField.setText(""); // Clear text field
        inputTextField.setEnabled(true); // Enable input
        submitButton.setEnabled(true); // Enable button
        displayStoryIntroduction();
    }

    // Method to display the story introduction
    private void displayStoryIntroduction() {
        storyTextArea.setText("**************************************************\n");
        storyTextArea.append("* *\n");
        storyTextArea.append("* ELIGE TU PROPIA AVENTURA               *\n");
        storyTextArea.append("* *\n");
        storyTextArea.append("**************************************************\n\n");

        storyTextArea.append("Has sido transportado al año 3433. Te despiertas y te das cuenta de que ya no estás en la Tierra. La gravedad se siente diferente. Está oscuro afuera y, al levantarte, te das cuenta de que estás afuera... ¿una casa?\n");
        storyTextArea.append("Recuerdas haber elegido caminar hacia la casa en tu último recuerdo.\n");
        storyTextArea.append("Te acercas a la casa y subes las escaleras hasta la puerta principal. Estás a punto de llamar cuando de repente notas que las luces dentro de la casa se encienden.\n\n");

        storyTextArea.append("La puerta se abre ligeramente, revelando un pasillo tenuemente iluminado. Un extraño olor metálico llena el aire. ¿Qué haces? [a] Entrar en la casa, [b] intentar encontrar otra forma de rodearla, o [c] huir?\n");
        statusLabel.setText("Introduce tu elección (a, b o c) y pulsa Continuar:");
        gameStage = 1; // Advance to the first decision stage
    }

    // Main method to process user choices
    private void processUserChoice() {
        String choice = inputTextField.getText().trim().toLowerCase(); // Clean and convert to lowercase
        inputTextField.setText(""); // Clear input field for the next choice

        if (gameStage == 1) { // First decision
            choice1 = choice; // Store the first choice
            handleFirstChoice(choice);
        } else if (gameStage == 2) { // Second decision (if 'a' was chosen first)
            handleSecondChoiceA(choice);
        } else if (gameStage == 3) { // Second decision (if 'b' was chosen first)
            handleSecondChoiceB(choice);
        } else if (gameStage == 99) { // Game has ended, waiting to see if the user wants to play again
            if (choice.equals("s")) {
                startGame(); // Restart the game
            } else {
                storyTextArea.append("\n¡Gracias por jugar!");
                inputTextField.setEnabled(false); // Disable input
                submitButton.setEnabled(false); // Disable button
                statusLabel.setText("Juego finalizado.");
            }
        }
    }

    private void handleFirstChoice(String choice) {
        storyTextArea.append("\nTu elección: " + choice + "\n\n"); // Display user's choice

        if (choice.equals("a")) {
            storyTextArea.append("Entras y la puerta se cierra de golpe detrás de ti. El pasillo es largo y silencioso. Ves dos caminos: una luz azul brillante a tu izquierda y un pasillo oscuro y estrecho a tu derecha. ¿Qué camino tomas? [a] Izquierda o [b] Derecha?\n");
            statusLabel.setText("Introduce tu elección (a o b) y pulsa Continuar:");
            gameStage = 2; // Advance to the second decision stage for path 'a'
        } else if (choice.equals("b")) {
            storyTextArea.append("Decides no entrar y rodeas la casa. Descubres un jardín lleno de plantas inusuales y brillantes. Algunas tienen bayas brillantes y tentadoras. ¿Qué haces? [a] Comer las bayas o [b] ignorarlas?\n");
            statusLabel.setText("Introduce tu elección (a o b) y pulsa Continuar:");
            gameStage = 3; // Advance to the second decision stage for path 'b'
        } else if (choice.equals("c")) {
            storyTextArea.append("Entras en pánico y corres de regreso a la oscuridad. Tropiezas por el terreno desconocido, perdiendo finalmente de vista la casa. Vagas sin rumbo bajo el cielo alienígena, sucumbiendo finalmente al duro entorno. Este no es el final que esperabas.\n");
            endGame(); // Call endGame as this is a final path
        } else {
            storyTextArea.append("Elección inválida. La historia termina abruptamente mientras te quedas paralizado por la indecisión. La casa se desvanece lentamente en la oscuridad.\n");
            endGame();
        }
    }

    private void handleSecondChoiceA(String choice) {
        storyTextArea.append("\nTu elección: " + choice + "\n\n"); // Display user's choice

        if (choice.equals("a")) {
            storyTextArea.append("Sigues la luz azul, que te lleva a una sala de control. Un amigable alienígena te saluda y te explica que has sido traído aquí para un programa de intercambio galáctico. ¡La computadora dice que sigues vivo!\n");
        } else if (choice.equals("b")) {
            storyTextArea.append("Te aventuras en el pasillo oscuro. El suelo se vuelve irregular y, de repente, pierdes el equilibrio. Caes en un profundo abismo. Te caíste por el acantilado y te precipitaste a la muerte. Lo siento...\n");
        } else {
            storyTextArea.append("Elección inválida. La historia termina abruptamente mientras te quedas paralizado por la indecisión. Eres consumido por la oscuridad.\n");
        }
        endGame();
    }

    private void handleSecondChoiceB(String choice) {
        storyTextArea.append("\nTu elección: " + choice + "\n\n"); // Display user's choice

        if (choice.equals("a")) {
            storyTextArea.append("Con cautela comes algunas de las bayas brillantes. Sorprendentemente, saben deliciosas y sientes una oleada de energía. Comiste algunas bayas y no moriste. ¿Eres tú, Peeta?\n");
        } else if (choice.equals("b")) {
            storyTextArea.append("Ignoras las bayas y continúas explorando el extraño jardín. Las plantas brillantes parecen cerrarse a tu alrededor y te das cuenta de que estás irremediablemente perdido en la naturaleza alienígena. Vagas indefinidamente, sin encontrar nunca el camino de regreso. Este no es el final que esperabas.\n");
        } else {
            storyTextArea.append("Elección inválida. La historia termina abruptamente mientras te quedas paralizado por la indecisión. Eres consumido por la extraña flora.\n");
        }
        endGame();
    }

    // Method to end the game and ask if the user wants to play again
    private void endGame() {
        storyTextArea.append("\n---\n");
        storyTextArea.append("Pulsa [s] para jugar de nuevo, o cualquier otra tecla para salir.\n");
        statusLabel.setText("¿Jugar de nuevo? (s/n):");
        gameStage = 99; // Set the stage for the restart option
    }

    public static void main(String[] args) {
        // Runs on Swing's Event Dispatch Thread
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new SimpleGUI(); // Creates an instance of your GUI
            }
        });
    }
}