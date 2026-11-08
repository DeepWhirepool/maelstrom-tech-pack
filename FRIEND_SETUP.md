# Maelstrom Tech — установка для второго игрока

Сборка обновляется сама при каждом запуске игры: Prism берёт свежую копию пака из GitHub и докачивает моды.

1. Прими приглашение в репозиторий `DeepWhirepool/maelstrom-tech-pack` (письмо от GitHub или https://github.com/notifications).
2. Установи **Git for Windows** (https://git-scm.com/download/win), все настройки по умолчанию.
3. Открой «Командная строка» (Win+R → `cmd`) и вставь:
   ```
   git clone https://github.com/DeepWhirepool/maelstrom-tech-pack C:\MaelstromPack
   ```
   Откроется браузер со входом в GitHub — войди и нажми «Authorize». Дальше вход запоминается.
4. Установи **Prism Launcher** (https://prismlauncher.org), войди в аккаунт Minecraft. **Добавить экземпляр** → Minecraft **1.21.1** → загрузчик **NeoForge 21.1.265** → имя «Maelstrom Tech» → ОК.
5. Скачай **packwiz-installer-bootstrap.jar** (https://github.com/packwiz/packwiz-installer-bootstrap/releases, раздел Assets). ПКМ по сборке → **Папка** → открой `minecraft` (нет — создай) и положи jar туда.
6. ПКМ по сборке → **Изменить** → **Настройки** → **Пользовательские команды** → галочка → в поле **«Перед запуском»**:
   ```
   cmd /c C:\MaelstromPack\update.bat
   ```
7. Там же, вкладка **Java** → галочка «Память» → максимум **6144–8192 МБ**.
8. **Запустить.** Первый раз окно загрузки модов идёт несколько минут. Если попросит «скачать вручную» — нажми ссылки, сохрани файлы в `Загрузки`, окно подхватит их само.
9. Дальше просто запускай игру — обновления подтягиваются перед каждым запуском.
