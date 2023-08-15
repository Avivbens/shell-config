#! /usr/bin/env zsh

echo "extends.work.sh loaded"

function work(){
    open -a Visual\ Studio\ Code.app
    open -a Google\ Chrome.app
    open -a Slack.app
    open -a WhatsApp.app
    open -a Music.app

    swgit work
    npmrc default
}

# open SQL remote for feed-service
function sqlfeed(){
    ttab -w "cd ~; lsof -nti:3307 | xargs kill; ./cloud_sql_proxy -instances=dozi-stg-home-page-1:us-east1:ge-stg-mysql-homepage-ver2=tcp:3307"
    ttab -w "cd ~; lsof -nti:3306 | xargs kill; ./cloud_sql_proxy -instances=dozi-stg-home-page-1:us-east1:ge-stg-mysql-homepage-ver2=tcp:3306"
}

# open SQL remote for meeting-brief
function sqlmeeting() {
  lsof -nti:5432 | xargs kill; ~/cloud_sql_proxy -instances=dozi-stg-integrated-exp-2:us-east1:meeting-briefs-stg=tcp:5432
}

# open gw
function opengw(){
    if ! [ $(where mvn) ]; then
        brew install mvn
        return
    fi

    mvn install -DskipTests
    java -Dspring.profiles.active=staging-local,defaultroute -DenvTarget=staging-local -jar dozi-apps-gateway/target/dozi-apps-gateway.jar
}

function auth() {
    gcloud auth login
    gcloud auth application-default login
    gcloud config set project zoominfo-2
}
