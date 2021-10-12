::echo %ESC%[90mWhite%ESC%[0m
::echo %ESC%[91mRed%ESC%[0m
::echo %ESC%[92mGreen%ESC%[0m
::echo %ESC%[93mYellow%ESC%[0m
::echo %ESC%[94mBlue%ESC%[0m
::echo %ESC%[95mMagenta%ESC%[0m
::echo %ESC%[96mCyan%ESC%[0m
::echo %ESC%[97mWhite%ESC%[0m
@echo off
    :: - Definir os caracteres para UTF-8
    chcp 65001
    SETLOCAL EnableDelayedExpansion

    title Folha de Rosto
    :main
        cls

        :: Variável Global para definir as cores dos caracteres
        call :setESC

        echo Você pretende %ESC%[96m MATAR ALGUM PROCESSO EM EXECUÇÃO %ESC%[0m Antes de Inicializar a Folha de Rosto?
        echo %ESC%[95m Insira Y para aceitar, N para negar e inicializar a%ESC%[0m %ESC%[93mFolha de Rosto%ESC%[0m %ESC%[95m ou Outra Letra para Sair [Y/N] %ESC%[0m
        
        ::Verificação da resposta do utilizador [Y/N]
        set /p response=

            IF /i %response% == Y (
                goto :killProcess
            ) ELSE IF /i %response% == N (
                goto :initializeProcess
            ) ELSE (
                goto :exitFromProgram
            )

            :killProcess
                cls

                set PROCNAME="node"
                set PROCID="5800"

                ::Listar todos os processos NodeJS rodando no Server
                echo %ESC%[95m Todos os Processos NodeJS %ESC%[0m
                tasklist /FI "IMAGENAME eq %PROCNAME%*"

                ::Listar o processo rodando na porta [5800 ou 5700] no Server
                echo %ESC%[93m Processo na porta %PROCID% - se o processo não for mostrado logo à baixo é só inserir o número ^"0^" para inicializar o serviço.%ESC%[0m
                netstat -a -n -o | findstr %PROCID%

                echo %ESC%[97m Insira à baixo o número do 'PID' para matar o Processo %ESC%[0m
                set /p pid=" -- PID: "

                if %pid% == 0 goto :initializeProcess
                
                :: Matando o Processo pelo PID
                echo %ESC%[95m Matando o Processo %ESC%[0m %pid%
                taskkill /F /PID %pid%

                ::IF ERRORLEVEL 1 goto initializeProcess

                IF %ERRORLEVEL% == 1 (
                    echo %ESC%[93m O Processo %pid% não foi encontrado. %ESC%[0m
                ) ELSE (
                    echo %ESC%[92m O Processo %pid% foi Finalizado %ESC%[0m
                    
                    pause
                    goto :initializeProcess
                )

                set response=e 
                pause
                goto :main
            
            :initializeProcess
                cls
                :: Inicializar o Serviço
                echo %ESC%[92m Inicializando o servico %ESC%[0m

                cd ..\..\
                cd interdigitos_folha_rosto_versao_0.2

                npm run startServer

                set response=e 
                pause
                goto :main
            :exitFromProgram
                cls

                echo %ESC%[45m Saindo... %ESC%[0m
                pause
                exit

    :: Não eliminar esta parte do Código... Essencial para colorizar os caracteres.
    :setESC
        for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
            set ESC=%%b
            exit /B 0
        )