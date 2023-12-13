usage() {
    cat << EOF
Script: $(basename "$0")

Ce script a pour but d'automatiser la génération et le build de Langium de notre extension.

Option:
  -h  Unique option permettant d'afficher un message d'explication du script.
EOF
}

while getopts "h" opt; do
    case $opt in
        h)
            usage
            exit 0
            ;;
        \?)
            echo "Option inconnue: -$OPTARG" >&2
            usage
            exit 1
            ;;
    esac
done

npm run langium:generate
npm run build
code --extensionDevelopmentPath="$PWD"
